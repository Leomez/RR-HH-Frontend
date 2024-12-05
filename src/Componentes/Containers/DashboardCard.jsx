import { React, useState } from "react";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp'
const DashboardCard = ({
    title,
    subtitle,
    children,
    action,
    footer,
    cardheading,
    headtitle,
    headsubtitle,
    middlecontent,
}) => {

    const [spand, setSpand] = useState(true);
    const handleSpand = () => {
        setSpand(!spand);
    }

    return (
        <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
            {cardheading ? (
                <CardContent>
                    <Typography variant="h6">{headtitle}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {headsubtitle}
                    </Typography>
                </CardContent>
            ) : (
                <CardContent sx={{ 
                    p: "10px", 
                    height: spand ? 'auto' : '2.5rem', 
                    maxHeight: '20rem', 
                    overflowY: 'scroll', 
                    transition: 'all 0.3s ease-in-out' }}>
                    {title ? (
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="space-between"
                            alignItems={"center"}
                            mb={3}
                        >
                            <Box>
                                {title ? <Typography variant="h6">{title}</Typography> : ""}

                                {subtitle ? (
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {subtitle}
                                    </Typography>
                                ) : (
                                    ""
                                )}
                            </Box>
                            <Box onClick={handleSpand} sx={{ cursor: "pointer", transition: 'all 0.3s ease-in-out' }}>
                                <ExpandMoreSharpIcon sx={{
                                    transform: spand ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'all 0.3s ease-in-out'
                                }}
                                />
                            </Box>
                            {action}
                        </Stack>
                    ) : null}

                    {children}
                </CardContent>
            )}

            {middlecontent}
            {footer}
        </Card>
    );
};

export default DashboardCard;