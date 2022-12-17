import { LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../api/publicApi";
import { Basic } from "../features/blog/templates/basic";
import { GetBlogResponse } from "../types/api/public";

const sampleHtml = `<p><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit. Maecenas ultricies mi eget mauris pharetra. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Morbi enim nunc faucibus a pellentesque sit amet porttitor eget. Netus et malesuada fames ac turpis. Malesuada fames ac turpis egestas integer eget aliquet nibh. Mattis molestie a iaculis at. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Id leo in vitae turpis. Ornare massa eget egestas purus viverra. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Quis imperdiet massa tincidunt nunc. Sit amet luctus venenatis lectus. Nibh ipsum consequat nisl vel pretium. Morbi tristique senectus et netus et malesuada fames ac turpis.</strong></p><p><br></p><p><br></p><p>Ut porttitor leo a diam sollicitudin. Adipiscing elit pellentesque habitant morbi tristique senectus et netus et. Sed blandit libero volutpat sed cras ornare arcu. Est ultricies integer quis auctor elit. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Dui id ornare arcu odio ut sem nulla pharetra diam. Aliquet porttitor lacus luctus accumsan. At tempor commodo ullamcorper a lacus vestibulum sed. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Ultrices in iaculis nunc sed augue lacus viverra vitae congue. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Consequat interdum varius sit amet mattis vulputate. Ut sem viverra aliquet eget. Augue eget arcu dictum varius duis at consectetur lorem donec. Lacus suspendisse faucibus interdum posuere lorem ipsum. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Dui accumsan sit amet nulla facilisi morbi tempus iaculis. Tortor consequat id porta nibh venenatis cras sed felis. Cursus mattis molestie a iaculis.</p><p><br></p>`;

export const Blog = () => {
  let { slug = "" } = useParams();
  const [blog, setBlog] = useState<GetBlogResponse | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getBlog(slug).then((d) => {
      setBlog(d);
      setLoading(false);
    });
  });
  return (
    <Paper style={{ minHeight: "100vh" }}>
      {loading && <LinearProgress />}

      {!!blog && <Basic content={blog.content} />}
    </Paper>
  );
};
