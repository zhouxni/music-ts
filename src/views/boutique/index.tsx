import React, { memo, useEffect, useState } from "react";
import PlayCategory from "@/component/playCategory";
import { getHighqualityTag } from "@Api/songer";
function Boutique() {
  const [tags, setTags] = useState<any[]>([]);
  useEffect(() => {
    getHighqualityTag().then((res: any) => {
      setTags(res.tags);
    });
  }, []);
  return <PlayCategory type={1} tags={tags} />;
}

export default memo(Boutique);
