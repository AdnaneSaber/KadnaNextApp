import React, { useReducer } from "react";
import { v4 as uuidV4 } from "uuid";
import schedules from "features/checkouts/data";
import { ProfileContext } from "./profile.context";

type Action =
  | { type: "HANDLE_ON_INPUT_CHANGE"; payload: any }
  | { type: "ADD_OR_UPDATE_CONTACT"; payload: any }
  | { type: "DELETE_CONTACT"; payload: any }
  | { type: "ADD_OR_UPDATE_ADDRESS"; payload: any }
  | { type: "DELETE_ADDRESS"; payload: any }
  | { type: "ADD_CARD"; payload: any }
  | { type: "DELETE_CARD"; payload: any }
  | { type: "SET_PRIMARY_CONTACT"; payload: any }
  | { type: "SET_PRIMARY_ADDRESS"; payload: any }
  | { type: "SET_PRIMARY_SCHEDULE"; payload: any }
  | { type: "SET_PRIMARY_CARD"; payload: any };
function reducer(state: any, action: Action): any {
  switch (action.type) {
    case "HANDLE_ON_INPUT_CHANGE":
      return { ...state, [action.payload.field]: action.payload.value };
    case "ADD_OR_UPDATE_CONTACT":
      if (action.payload.id) {
        return {
          ...state,
          contactsSet: state.contactsSet.map((item: any) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload }
              : item
          ),
        };
      }
      const newContact = {
        ...action.payload,
        id: uuidV4(),
        type: state.contactsSet.length === "0" ? "PRIMARY" : "SECONDARY",
      };
      return {
        ...state,
        contact: [...state.contactsSet, newContact],
      };

    case "DELETE_CONTACT":
      return {
        ...state,
        contact: state.contactsSet.filter(
          (item: any) => item.id !== action.payload
        ),
      };
    case "ADD_OR_UPDATE_ADDRESS":
      if (action.payload.id) {
        return {
          ...state,
          address: state.addressSet.map((item: any) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload }
              : item
          ),
        };
      }
      const newAdress = {
        ...action.payload,
        id: uuidV4(),
        type: state.addressSet.length === "0" ? "PRIMARY" : "SECONDARY",
      };
      return {
        ...state,
        address: [...state.addressSet, newAdress],
      };
    case "DELETE_ADDRESS":
      return {
        ...state,
        address: state.addressSet.filter(
          (item: any) => item.id !== action.payload
        ),
      };
    case "ADD_CARD":
      const newCard = {
        id: action.payload.id,
        type: state.card.length === "0" ? "PRIMARY" : "SECONDARY",
        cardType: action.payload.brand.toLowerCase(),
        name: state.name,
        lastFourDigit: action.payload.last4,
      };
      return {
        ...state,
        card: [newCard, ...state.card],
      };
    case "DELETE_CARD":
      return {
        ...state,
        card: state.card.filter((item: any) => item.id !== action.payload),
      };
    case "SET_PRIMARY_CONTACT":
      return {
        ...state,
        contact: state.contactsSet.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: "PRIMARY" }
            : { ...item, type: "SECONDARY" }
        ),
      };
    case "SET_PRIMARY_ADDRESS":
      return {
        ...state,
        address: state.addressSet.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: "PRIMARY" }
            : { ...item, type: "SECONDARY" }
        ),
      };
    case "SET_PRIMARY_SCHEDULE":
      return {
        ...state,
        schedules: state.schedules.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: "PRIMARY" }
            : { ...item, type: "SECONDARY" }
        ),
      };
    case "SET_PRIMARY_CARD":
      return {
        ...state,
        card: state.card.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: "PRIMARY" }
            : { ...item, type: "SECONDARY" }
        ),
      };
    default:
      return state;
  }
}

type ProfileProviderProps = {
  initData: any;
};

export const ProfileProvider: React.FunctionComponent<ProfileProviderProps> = ({
  children,
  initData,
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initData, schedules });
  // console.log(state, 'profile provider state');

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
