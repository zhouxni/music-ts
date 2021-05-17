import React, { memo, useEffect, useState } from "react";
import PlayCategory from "@/component/playCategory";
import { getPlayListCategory } from "@Api/songer";
function AllCategory() {
  const [tags, setTags] = useState<any[]>([]);
  useEffect(() => {
    getPlayListCategory().then((res: any) => {
      setTags(res.sub);
    });
  }, []);
  return <PlayCategory type={0} tags={tags} />;
}

export default memo(AllCategory);
