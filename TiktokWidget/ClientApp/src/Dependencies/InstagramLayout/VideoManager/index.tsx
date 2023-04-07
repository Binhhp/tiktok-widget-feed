import { Checkbox, Modal } from "@shopify/polaris";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import {
  GetVideoByJobRequest,
  SourceTypeEnum,
} from "repositories/dtos/requests/GetVideoByJobRequest";
import { RootReducer } from "stores/Admin/reducers";
import DragDropList from "./DragDropList";
import { VideoPreviewProps, VideoState } from "./Model";
import { ImportVideoTitle, VideoPreviewContainer } from "./CssStyled";
import InstagramWidgetAPI from "repositories/implements/InstagramWidgetAPI";
import SniperLoading from "ui-components/Loading/SniperLoading";
import { AddJobRequest } from "repositories/dtos/requests/AddJobRequest";

const NUMBER_OF_GET_VIDEOS = 1000;
const NUMBER_OF_SHOW_VIDEOS = 6;
const NUMBER_REFRESH_GET_VIDEOS = 1400;

const InstagramVideoPreview = React.memo(function InstagramVideoPreview(
  props: VideoPreviewProps
) {
  //Loadiing the video preview when get data
  const [loading, setLoading] = useState(false);
  //State management
  const [state, setState] = useState<VideoState>({
    pageIndex: 1,
    data: [],
    dataReal: [],
    unChecked: props.videoUncheckedDefault ?? [],
    count: 0,
  });

  const instagramReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const [disableTopNewItems, setDisableTopNewItems] = useState(
    props.optionsShowItem?.disableTopNewItems
  );
  const onHandleTopNewItems = useCallback(() => {
    setDisableTopNewItems(!disableTopNewItems);
  }, [disableTopNewItems, setDisableTopNewItems]);

  const fetchData = async () => {
    console.clear();
    //Clear when get data successfully
    if (!window._timeout) return;
    if (!loading) setLoading(true);
    if (window._timeout < new Date().getTime()) {
      window._timeout = 0;
      setLoading(false);
      return;
    }

    const valueSource =
      props.optionsShowItem?.valueSource ??
      instagramReducer.settings.valueSource;
    let sourceType = instagramReducer.settings.source;
    if (props.optionsShowItem?.sourceType) {
      //Get value from Enum Source in Widget Manager
      sourceType =
        props.optionsShowItem.sourceType === "InstagramHashTag"
          ? SourceTypeEnum.InstagramHashTag
          : SourceTypeEnum.InstagramUserName;
    }
    try {
      const res = await InstagramWidgetAPI.GetVideosByJob(
        new GetVideoByJobRequest(valueSource, sourceType),
        NUMBER_OF_GET_VIDEOS,
        state.pageIndex,
        props?.optionsShowItem?.widgetId
      );
      if (res?.count !== undefined) {
        //Set value to state
        let newState = {
          ...state,
          count: res?.count,
          pageIndex: state.pageIndex,
          dataReal: [...res?.data],
          data: res.data.slice(0, NUMBER_OF_SHOW_VIDEOS),
        };
        //Set count from widget manager
        window._timeout = 0;
        window._syncJob = false;
        setState(newState);
        setLoading(false);
      } else {
        //Add job if get data failture
        const addJobResp = await AddJobWhenFailture(valueSource, sourceType);
        if (addJobResp || window._syncJob) {
          setTimeout(() => fetchData(), NUMBER_REFRESH_GET_VIDEOS);
        }
      }
    } catch {
      //Add job if get data failture
      const addJobResp = await AddJobWhenFailture(valueSource, sourceType);
      if (addJobResp || window._syncJob) {
        setTimeout(() => fetchData(), NUMBER_REFRESH_GET_VIDEOS);
      }
    }
    console.clear();
  };

  //Func add job if get data failture, add job only 1 time (condition: window._syncJob = false)
  const AddJobWhenFailture = useCallback(
    async (
      valS: string | undefined,
      sourceT: SourceTypeEnum | undefined
    ): Promise<any> => {
      if (!window._syncJob && valS && sourceT !== undefined) {
        const resp = await InstagramWidgetAPI.AddJob(
          shopReducer.shop.domain,
          new AddJobRequest(valS, sourceT)
        );
        window._syncJob = resp.Status;
        return resp.Status;
      }
      return false;
    },
    [window._syncJob]
  );

  //Clear state and option when undidmount
  useEffect(() => {
    return () => {
      onClearStateAndOptions();
    };
  }, []);

  //Get data
  useEffect(() => {
    if (props.active) {
      window._timeout = new Date().getTime() + 1 * 60000;
      fetchData();
    } else {
      onClearStateAndOptions();
    }
  }, [props.active]);

  const onCloseModal = () => {
    onClearStateAndOptions();
    props.onCloseModal();
  };

  const onClearStateAndOptions = () => {
    setState({
      ...state,
      pageIndex: 1,
      data: [],
      dataReal: [],
      unChecked: [],
      count: 0,
    });
    window._timeout = 0;
    window._syncJob = false;
  };

  //Handle event Submit when click button
  const [isPending, startPending] = useState(false);
  const onSubmit = useCallback(async () => {
    startPending(true);
    let items = state.data;
    if (state.data.length < state.dataReal.length) {
      items = state.data.concat(
        state.dataReal.slice(state.data.length, state.dataReal.length)
      );
    }
    const videoSorted = items.map((x) => x?.id as string);
    await props.onSaveChanges(state.unChecked, videoSorted, disableTopNewItems);
    startPending(false);
  }, [JSON.stringify(state), props.onSaveChanges, disableTopNewItems]);

  //Uncheck list video items in state
  const unCheckShowVideos = useCallback(
    (id: string) => () => {
      let videoChecks = state.unChecked.filter((x) => x !== id);

      if (!state.unChecked.includes(id)) {
        videoChecks.push(id);
      }
      return setState({
        ...state,
        unChecked: videoChecks,
      });
    },
    [state]
  );

  const onChangeData = useCallback(
    (data: any[]) => {
      setState({
        ...state,
        data: data,
      });
    },
    [state]
  );

  //Get more data from paging
  const onGetmore = useCallback(() => {
    const nextPage = state.pageIndex + 1;
    const newData = state.dataReal.slice(
      state.pageIndex * NUMBER_OF_SHOW_VIDEOS,
      nextPage * NUMBER_OF_SHOW_VIDEOS
    );
    const data = state.data.concat(newData).slice(0, state.count);
    setState({
      ...state,
      data: data,
      pageIndex: nextPage,
    });
  }, [state]);

  const renderEmpty = <div className="video-empty">No data avaiable.</div>;
  const renderDataList = useMemo(() => {
    return state.data.length > 0 ? (
      <DragDropList
        {...state}
        onChangeData={onChangeData}
        loading={loading}
        onGetmore={onGetmore}
        unCheckShowVideos={unCheckShowVideos}
      />
    ) : (
      renderEmpty
    );
  }, [loading, state.data, onGetmore, onChangeData, unCheckShowVideos]);

  return (
    <Modal
      sectioned
      loading={loading && !state.count}
      open={props.active}
      title={<ImportVideoTitle>Import the Instagram Post</ImportVideoTitle>}
      onClose={onCloseModal}
      primaryAction={{
        loading:
          isPending || (props?.optionsShowItem?.widgetId ? loading : false),
        content: props.buttonSaveText ?? "Next",
        onAction: onSubmit,
        id: "btn-next",
      }}
      secondaryActions={
        !props.hiddenButtonBack
          ? [
              {
                content: "Back",
                onAction: onCloseModal,
              },
            ]
          : []
      }
    >
      <Modal.Section>
        <Suspense fallback={<SniperLoading />}>
          <VideoPreviewContainer>
            <div className="header">
              <div>
                "{state.data.length}" posts found from{" "}
                <strong>
                  @
                  {props?.optionsShowItem?.valueSource ??
                    instagramReducer.settings.valueSource}
                </strong>
              </div>
              {props.optionsShowItem?.widgetId && (
                <div className="cbx-top">
                  <div className="check-video">
                    <Checkbox
                      label=""
                      checked={!disableTopNewItems}
                      onChange={onHandleTopNewItems}
                    />
                  </div>
                  <span>The new videos are at the top of this list.</span>
                </div>
              )}
              <div className="note">
                Tip: To sort the video, use drag and drop
              </div>
            </div>
            {renderDataList}
          </VideoPreviewContainer>
        </Suspense>
      </Modal.Section>
    </Modal>
  );
});
export default InstagramVideoPreview;
