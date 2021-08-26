import React, { useCallback, useEffect, useState, useContext } from "react";
import { FormattedMessage } from "react-intl";
import {
  Box,
  Image,
  Content,
  Title,
  Description,
  SearchWrapper,
} from "./banner.style";

import { Waypoint } from "react-waypoint";
import { useAppDispatch } from "contexts/app/app.provider";
import Search from "features/search/search";
import { useQuery } from "@apollo/client";
import { GET_THEME } from "graphql/query/theme.query";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "graphql/mutation/refresh";
import { ProfileContext } from "contexts/profile/profile.context";
interface Props {
  style?: any;
  imageUrl: string;
  intlTitleId: string;
  intlDescriptionId: string;
}
export const Banner: React.FC<Props> = ({
  style,
  imageUrl,
  intlTitleId,
  intlDescriptionId,
}) => {
  const [refreshToken, dataRefresh] = useMutation(REFRESH_TOKEN);
  const [error, setError] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("refresh_token");
    if (token) refreshToken({ variables: { token } });
    if (dataRefresh.data) {
      localStorage.setItem("access_token", dataRefresh.data.refreshToken.token);
      localStorage.setItem(
        "refresh_token",
        dataRefresh.data.refreshToken.refreshToken
      );
    }
  }, [error]);
  const dispatch = useAppDispatch();
  const setSticky = useCallback(() => dispatch({ type: "SET_STICKY" }), [
    dispatch,
  ]);
  const removeSticky = useCallback(() => dispatch({ type: "REMOVE_STICKY" }), [
    dispatch,
  ]);
  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === "above") {
      setSticky();
    }
  };
  const { data } = useQuery(GET_THEME, {
    onError: () => {
      setError(!error);
    },
  });

  return (
    <Box display={"flex"} style={style}>
      <Image
        backgroundImage={`url(${
          data
            ? data.theme.bannerImage
              ? "http://127.0.0.1:8000/" + data.theme.bannerImage
              : " "
            : " "
        })`}
      />
      <Content>
        <Title>
          {data
            ? data.theme.HeaderTitle
              ? data.theme.HeaderTitle
              : "Set the Header title on the admin page"
            : "Set the Header title on the admin page"}
        </Title>
        <Description>
          <span style={{ color: "#fff" }}>
            {data
              ? data.theme.HeaderSubTitle
                ? data.theme.HeaderSubTitle
                : "Set the Header sub title on the admin page"
              : "Set the Header sub title on the admin page"}
          </span>
        </Description>
        <SearchWrapper>
          <Search
            className="banner-search"
            shadow="0 21px 36px rgba(0,0,0,0.05)"
          />
        </SearchWrapper>
        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </Content>
    </Box>
  );
};
