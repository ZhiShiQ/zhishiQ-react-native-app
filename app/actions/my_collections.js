/**
 * Created by moyu on 2017/2/26.
 */
import {_t} from '../helpers';
import * as $ from '../constant'

export const setMyActiveCollectionTab = (index) => _t($.SET_MY_ACTIVE_COLLECTION_TAB, {index})
export const setMyCollectionPeople = (people) => _t($.MY_COLLECTION_PEOPLE_SET, {people})
export const setMyCollectionServices = (services) => _t($.MY_COLLECTION_PEOPLE_SET, {services})
export const delMyCollectionServiceByIndex = (index) => _t($.MY_COLLECTION_SERVICES_REMOVE_BY_INDEX, {index})
export const delMyCollectionPeopleByIndex = (index) => _t($.MY_COLLECTION_PEOPLE_REMOVE_BY_INDEX, {index})
