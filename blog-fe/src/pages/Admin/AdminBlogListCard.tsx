import { Box, Card, CardActionArea, CardContent, styled, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { BasicBlog } from "../Blog/BasicBlog"

type AdminBlogListCardProps = {
    templateId: string
    content: any
    title: string
    urlSlug: string
}
const StyledCard = styled(Card)({
    // marginLeft: 10, 
    // marginRight: 10
})
export const AdminBlogListCard = ({
    title,
    content,
    urlSlug
}: AdminBlogListCardProps) => {
    const navigate = useNavigate();
    return (
        <StyledCard variant="outlined">
            <CardActionArea onClick={() => {
                navigate(`/blog/${urlSlug}`);
            }}>
                <CardContent>
                    <Typography>
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </StyledCard>
    )
}