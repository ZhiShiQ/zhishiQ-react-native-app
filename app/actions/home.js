/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger, setToken} from '../helpers';
import {homeURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
import * as $ from '../constant';

function _keys_data () {
    const args = Array.from(arguments);
    return _t($.HOME_PAGE_SET, {keys: args.slice(0, args.length-1), data: args[args.length-1]})
}

export const fetchHomePage = (opts={}) =>
    (emit, getState) => {
        const {refresh} = opts;
        const {isFetching, isFirst} = getState().home;
        if (isFetching) {
            return;
        }
        return emit([setHomeFetching(true)]) &&
            fetch(homeURL + '?')
                .then(r => r.json())
                .then(json => {
                    if (json.success == false) {
                        alert(json.message);
                    } else {
                        const activities = json.activities.map(mapActivity);
                        emit([
                            setHomeSliders(json.sliders.map(mapSlider)),
                            setHomeActivities([activities.slice(0, 2), activities.slice(2)]),
                            setHomeRecommendTopics(json.recommendTopics.map(mapTopic)),
                            setHomeHotTeachers(json.hotEditors.map(mapEditor)),
                            setHomeMainItems(json.mainItems.map(mapMainItem)),
                            setHomeSubItems(json.subItems.map(mapSubItem)),
                            setHomeSinglePicture(mapBanner(json.adBanner1)),
                            setHomeSinglePicture2(mapBanner(json.adBanner2)),
                        ]);
                    }
                    emit([
                        setHomeFetching(false),
                        isFirst && setHomeFirst(false)
                    ])
                })
                .catch(ex => {
                    _debugger(ex);
                    emit([setHomeFetching(false)])
                })
    }

const mapSlider = ({coverImage, ...r}) => ({
    ...r, thumbnail: {uri: coverImage}
});

const mapMainItem = ({iconImage, ...r}) => ({
    ...r, thumbnail: {uri: iconImage}
})

const mapSubItem = ({iconImage, ...r}) => ({
    ...r, thumbnail: {uri: iconImage}
})

const mapActivity = ({coverImage, ...r}) => ({
    ...r, thumbnail: {uri: coverImage}
});

const mapTopic = ({name, client_count, advisor_average_rate, advisor_avatar, ...r}) => ({
    ...r, client_count, advisor_average_rate, avatar: advisor_avatar,
    title: name, bottomValues: [client_count, advisor_average_rate],
    content: r.advisor_brief, thumbnail: {uri: advisor_avatar}
});
const mapBanner = ({coverImage, ...r}) => ({
    ...r, thumbnail: {uri: coverImage}
});
const mapEditor = ({name, avatar, client_count, advisor_average_rate, ...r}) => ({
    ...r, client_count, advisor_average_rate, avatar,
    title: name, bottomValues: [client_count, advisor_average_rate],
    content: r.brief, thumbnail: {uri: avatar}
})


export const setHomeFetching = isFetching => _keys_data('isFetching', isFetching);
export const setHomeRefreshing = isRefreshing => _keys_data('isRefreshing', isRefreshing);
export const setHomeSliders = sliders => _keys_data('sliders', sliders);
export const setHomeMainItems = mainItems => _keys_data('mainItems', mainItems);
export const setHomeSubItems = subItems => _keys_data('subItems', subItems);
export const setHomeActivities = activities => _keys_data('activities', activities);
export const setHomeRecommendTopics = recommendTopics => _keys_data('recommendTopics', recommendTopics);
export const setHomeHotTeachers = hotTeachers => _keys_data('hotTeachers', hotTeachers);
export const setHomeSinglePicture = singlePicture => _keys_data('singlePicture', singlePicture);
export const setHomeSinglePicture2 = singlePicture2 => _keys_data('singlePicture2', singlePicture2);
export const setHomeFirst = isFirst => _keys_data('isFirst', isFirst);
