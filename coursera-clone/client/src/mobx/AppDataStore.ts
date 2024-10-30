//yarn add mobx mobx-react mobx-persist-store
import { makeAutoObservable } from "mobx";
import {UserInfo} from "../@types/UserInfo.ts";
import {ChatModel} from "../@types/ChatModel.ts";
import { makePersistable,hydrateStore  } from 'mobx-persist-store';

class AppDataStore{
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'SampleStore',
            properties: ['user','accessToken','isLoginOpen','currentLink'],
            storage: window.localStorage
        });
    }

    accessToken : string = "";
    currentLink : string = "";

    isLoginOpen:boolean=false;
    isSignUpOpen:boolean=false;

    user: UserInfo | null = null;

    messages = new Array<ChatModel>;

    setAccessToken(token:string) {
        this.accessToken = token;
    }
    setCurrentLink(val:string) {
        this.currentLink = val;
    }

    setIsLoginOpen(val:boolean) {
        this.isLoginOpen = val;
    }
    setIsSignUpOpen(val:boolean) {
        this.isSignUpOpen = val;
    }


    setUser(item: UserInfo | null ) {
        this.user = item;
    }

    setMessages(items: Array<ChatModel> ) {
        this.messages = items;
    }


    async hydrateStore() {
        await hydrateStore(this);
    }
}

const store = new AppDataStore();
export default store;