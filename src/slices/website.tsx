import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import { TAction } from 'src/store'
import { WebSite } from 'src/types/WebSite'

interface State {
    list: WebSite[],
    isModalOpen: boolean
    selectedId?: string,
    current?:  WebSite,
    isUpdating: boolean
}

const initialState : State = {
    list: [],
    isModalOpen: false,
    isUpdating: true
}

const slice = createSlice({
    name: 'webSites',
    initialState,
    reducers: {
        fetchWebSites(state, action: PayloadAction<WebSite[]>) {
            state.list = action.payload
            state.isUpdating = false
        },
        createWebSite(state, action: PayloadAction<WebSite>) {
            state.list = [...state.list, action.payload];
        },
        updateWebSite(state, action: PayloadAction<WebSite>) {
            state.current = action.payload
        },
        fetchWebSite(state, action: PayloadAction<WebSite>) {
            state.current = action.payload
        },
        selectWebSite(state, action) {
            const { selectedId = null } = action.payload

            state.isModalOpen = true
            state.selectedId = selectedId
        },
        openModal(state) {
            state.isModalOpen = true
        },
        setUpdatingStatus(state) {
            state.isUpdating = true
        },
        closeModal(state) {
            state.isModalOpen = false
            state.selectedId = undefined
        }
    }
})


export const reducer = slice.reducer

export const fetchWebSites = ():TAction<WebSite[]> => async  (dispatch) => {
    dispatch(slice.actions.setUpdatingStatus())
    const response = await axios.get(`/api/websites`)
    dispatch(slice.actions.fetchWebSites(response.data))
}

export const fetchWebSite = (id:string):TAction<WebSite> => async  (dispatch) => {
    const response = await axios.get(`/api/websites/${id}`)
    dispatch(slice.actions.fetchWebSite(response.data))
}

export const createWebSite = (data:WebSite):TAction<WebSite> => async (dispatch) => {
    const response = await axios.post('/api/websites', data);

    dispatch(slice.actions.createWebSite(response.data));
}

export const updateWebSite = (id:string,data:WebSite):TAction<WebSite> => async (dispatch) => {
    const response = await axios.patch(`/api/formconfigupdatefield`, {...data, websiteId: id});

    dispatch(slice.actions.updateWebSite(response.data));
}

export const selectWebSite = (selectedId:string):TAction<WebSite> => async (dispatch) => {
    dispatch(slice.actions.selectWebSite({ selectedId }));
}

export const openModal = ():TAction<State> => (dispatch) => {
    dispatch(slice.actions.openModal());
}

export const closeModal = ():TAction<State> => (dispatch) => {
    dispatch(slice.actions.closeModal());
}

export default slice;