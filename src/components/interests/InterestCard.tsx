import React from 'react';
import {AspectRatio, Button, Card, CardContent, IconButton, Link, Typography} from "@mui/joy";
import {FaBookmark} from "react-icons/fa";
import type {Interest} from "../../models/interest.ts";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export type InterestCardProps = {
    interest: Interest;
}

const InterestCard: React.FC<InterestCardProps> = ({interest}) => {
    return (
        <Card>
            <div>
                <Typography level="title-lg">{interest.name}</Typography>
                <Typography level="body-sm">April 24 to May 02, 2021</Typography>
                <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{position: 'absolute', top: '0.875rem', right: '0.5rem'}}
                >
                    <FaBookmark/>
                </IconButton>
            </div>


            <ImageGallery
                items={interest.images.map(i => ({
                    original: i.url
                }))}
                renderItem={(item) => (
                    <AspectRatio minHeight="120px" maxHeight="300px">
                        <img src={item.original}/>
                    </AspectRatio>
                )}
                showBullets
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
            />
            <CardContent orientation="horizontal">
                <div>
                    <Typography level="body-xs">Total price:</Typography>
                    <Typography sx={{fontSize: 'lg', fontWeight: 'lg'}}>$2,900</Typography>
                </div>
                <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ml: 'auto', alignSelf: 'center', fontWeight: 600}}
                    component={Link}
                    href={interest.link}
                >
                    Explore
                </Button>
            </CardContent>
        </Card>
    );
}
export {InterestCard}