using System;
using System.Collections.Generic;
using System.Linq;
using TiktokWidget.Service.ViewModels;

namespace TiktokWidget.Service.Extensions
{
    public static class VideoManager
    {
        /// <summary>
        /// Build custom view items from options widget
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="inputItems">List items</param>
        /// <param name="itemSorts">Items Sort</param>
        /// <param name="disableItems">List item disable show</param>
        /// <param name="disableTopNewItems">disable add top new items</param>
        /// <param name="funcOutputItemSortsChanged">action add or update for ItemSorts of widget</param>
        /// <returns></returns>
        public static IQueryable<T> BuildItems<T>(this IEnumerable<T> inputItems, 
            IEnumerable<string> itemSorts, IEnumerable<string> disableItems, bool disableTopNewItems,
            Action<IEnumerable<string>> funcOutputItemSortsChanged = null)
            where T : BaseViewModel
        {
            var resp = Enumerable.Empty<T>().AsQueryable(); 
            var outputItemSorts = itemSorts.ToList();
            if (inputItems.Any() && itemSorts != null && itemSorts.Any())
            {
                if(disableItems == null) disableItems = new List<string>();
                var videoSelectShowItems = inputItems.Where(x => !disableItems.Contains(x.Id)).ToList();
                var videoSortOptions = videoSelectShowItems.Where(x => itemSorts.Contains(x.Id)).ToList();

                //Check new items expect from item sorts
                if (inputItems.Count() > itemSorts.Count())
                {
                    var videoExpectSort = videoSelectShowItems.Except(videoSortOptions).ToList();
                    if (videoExpectSort.Any())
                    {
                        //Expect new items
                        if (disableTopNewItems)
                        {
                            //Sort follow items widget to bottom of new list
                            var itemSortesOfWidget = itemSorts.ToList();
                            itemSortesOfWidget.AddRange(videoExpectSort.Select(x => x.Id).ToList());
                            outputItemSorts = itemSortesOfWidget;
                        }
                        else
                        {
                            //Sort follow items to top of new list
                            var itemSortesOfWidget = videoExpectSort.Select(x => x.Id).ToList();
                            itemSortesOfWidget.AddRange(itemSorts.ToList());
                            outputItemSorts = itemSortesOfWidget;
                        }
                    }
                    var videoSortFollowOptions = videoSortOptions.OrderBy(x => itemSorts.ToList().IndexOf(x.Id)).ToList();
                    if (disableTopNewItems)
                    {
                        //Add bottom of list new items
                        videoSortFollowOptions.AddRange(videoExpectSort);
                    }
                    else
                    {
                        //Add top of list new items
                        videoExpectSort.AddRange(videoSortFollowOptions);
                        resp = videoExpectSort.AsQueryable();
                    }
                }
                //Sort follow item sorts from widget setting
                else
                {
                    resp = videoSortOptions.OrderBy(x => itemSorts.ToList().IndexOf(x.Id)).AsQueryable();
                }
            }
            else
            {
                outputItemSorts = inputItems.Select(x => x.Id).ToList();
                resp = inputItems.AsQueryable();
            }
            if(funcOutputItemSortsChanged != null && outputItemSorts.Count() != itemSorts.Count())
            {
                funcOutputItemSortsChanged(outputItemSorts);
            }
            //Add index for list items
            var queryResp = resp.ToList();
            var query = queryResp.Select(x => { x.Index = queryResp.IndexOf(x); return x; }).ToList();
            resp = query.AsQueryable();
            return resp;
        }
    }
}
