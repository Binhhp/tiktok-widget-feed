import { TemplateType } from "Dependencies/TikTokLayout/LayoutTemplateType";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { TemplateInstagramType } from "stores/Admin/InstagramWidget/state";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";
import { TabProps, WidgetType } from "../../../OnBoardingModel";
import { CustomizeDesignWrapper } from "./styled";
import TemplateWidget from "./TemplateWidget";

function CustomizeDesign(props: TabProps) {
  const [template, setTemplate] = useState<number>(
    props.widgetType === WidgetType.Tiktok
      ? TemplateType.List
      : TemplateInstagramType.List
  );

  const onSelectTemplate = useCallback(
    (source: number) => () => {
      setTemplate(source);
    },
    [template, setTemplate]
  );

  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    if (props.widgetType === WidgetType.Tiktok) {
      dispatch(
        WidgetActionTS.OnSetSetting({
          layout: template,
        })
      );
    } else {
      dispatch(
        InstagramWidgetActionTS.OnSetSetting({
          layout: template,
        })
      );
    }
    return true;
  }, [template]);

  useEffect(() => {
    props.setActionFunc(onSubmit);
  }, []);

  return (
    <CustomizeDesignWrapper>
      <TemplateWidget
        onSetTemplate={onSelectTemplate}
        template={template}
        {...props}
      />
    </CustomizeDesignWrapper>
  );
}
export default React.memo(CustomizeDesign);
