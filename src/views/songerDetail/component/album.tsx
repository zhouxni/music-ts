import React, { memo, useEffect } from "react";
import { getSongAlbum } from "@Api/songer";
function Album(props: { id: string | null }) {
  const { id } = props;
  useEffect(() => {
    getSongAlbum({ id });
  }, []);
  return <></>;
}

export default memo(Album);
