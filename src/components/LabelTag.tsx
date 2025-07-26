import React, {useMemo} from 'react';
import {Box, Card, type CardProps, Stack, Typography, Divider, Sheet} from "@mui/joy";
import type {SxProps} from "@mui/system";

export type LabelProps = CardProps & {
    /**
     * The label text to display
     */
    label: string;
    /**
     * Optional type label to show in a separate section
     */
    type?: string;
    /**
     * The color of the label, using MUI Joy color system
     */
    color?: 'primary' | 'neutral' | 'danger' | 'info' | 'success' | 'warning';
    /**
     * The variant of the label, using MUI Joy variant system
     */
    variant?: 'solid' | 'soft' | 'outlined' | 'plain';
}

const LabelTag: React.FC<LabelProps> = ({
                                         label,
                                         type,
                                         color = 'primary',
                                         variant = 'soft',
                                         sx,
                                         ...props
                                     }) => {

    const boxProps = useMemo((): SxProps => ({
        p: 1
    }), [])

    return (
        <Card
            variant={variant}
            color={color}
            sx={{p: 0}}
            {...props}
        >
            <Stack direction="row" sx={{borderRadius: "inherit"}}>
                { type &&
                    <Sheet variant={"solid"} color={color}
                           sx={{...boxProps, borderRadius: "inherit", borderBottomRightRadius: 0, borderTopRightRadius: 0}}>
                        <Typography level="body-xs" fontWeight="md" textColor={"background.body"}>
                            {type}
                        </Typography>
                    </Sheet>
                }
                
                <Box sx={boxProps}>
                    <Typography level="body-xs" color={color}>
                        {label}
                    </Typography>
                </Box>

            </Stack>
        </Card>
    );
}

export {LabelTag}