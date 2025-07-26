import {Renderer} from "marked";
import {renderToString} from "react-dom/server";
import {
    Card,
    List,
    ListItem,
    Typography,
    AspectRatio,
    CardContent
} from "@mui/joy";
import {Highlight} from "prism-react-renderer";


// Helper function to convert tokens to HTML string
function tokensToHTML(tokens: any): string {
    if (!tokens) return '';

    // If tokens is a string, return it directly
    if (typeof tokens === 'string') return tokens;

    // If tokens is an array, process each token
    if (Array.isArray(tokens)) {
        return tokens.map(token => {
            // If token has a text property, use it
            if (token.text)
                return token.text;

            // If token has tokens property, recursively process them
            if (token.tokens)
                return tokensToHTML(token.tokens);

            // If token is a string, return it directly
            if (typeof token === 'string')
                return token;

            // Default case
            return '';
        }).join('');
    }

    // If tokens has a text property, use it
    if (tokens.text) return tokens.text;

    // If tokens has tokens property, recursively process them
    if (tokens.tokens)
        return tokensToHTML(tokens.tokens);

    // Default case
    return '';
}

export const muiRenderer: Partial<Renderer> = {
    heading({tokens, depth}): string {
        const text = tokensToHTML(tokens);
        const level = depth <= 2 ? "h" + depth : "h3";

        return renderToString(
            <Typography level={level as any} gutterBottom sx={{mt: 3}}>{text}</Typography>
        );
    },
    paragraph(options: { tokens: any, type?: string }): string {
        if (Array.isArray(options.tokens)) {
            const imageTokens = options.tokens.filter(token => token.type === 'image');

            if (imageTokens.length > 0) {
                // Process image tokens using the image renderer
                const imageResults = imageTokens.map(token =>
                    // @ts-ignore
                    this.image({
                        href: token.href,
                        title: token.title,
                        text: token.text
                    })
                );

                // Process non-image tokens as paragraph content
                const nonImageTokens = options.tokens.filter(token => token.type !== 'image');
                let paragraphContent = '';

                if (nonImageTokens.length > 0) {
                    paragraphContent = renderToString(
                        <Typography level={"body-md"}>{tokensToHTML(nonImageTokens)}</Typography>
                    );
                }

                // Combine paragraph content with image results
                return paragraphContent + imageResults.join('');
            }
        }

        // Default behavior for paragraphs without images
        const text = tokensToHTML(options.tokens);
        return renderToString(
            <Typography level={"body-md"} gutterBottom>{text}</Typography>
        );
    },
    list(token): string {
        console.log(token)
        return renderToString(
            <List marker={token.ordered ? "decimal" : "disc"}>
                {token.items.map((item: any, index: number) => {
                    // Check if the item text contains ** markers for bold text
                    const itemText = tokensToHTML(item);
                    if (itemText && itemText.includes('**')) {
                        // Process the text to handle bold markers
                        let parts = itemText.split('**');
                        let fragments = [];
                        
                        for (let i = 0; i < parts.length; i++) {
                            if (i % 2 === 0) {
                                // Even parts are regular text
                                if (parts[i]) {
                                    fragments.push(parts[i]);
                                }
                            } else {
                                // Odd parts are bold text
                                fragments.push(<strong>{parts[i]}</strong>);
                            }
                        }
                        
                        return <ListItem key={index}>{fragments}</ListItem>;
                    }
                    
                    // Default behavior for list items without bold markers
                    return <ListItem key={index}>{itemText}</ListItem>;
                })}
            </List>
        );
    },
    image({href, title, text}): string {
        return renderToString(
            <Card sx={{p: 0, mt: 1, mb: 1}}>
                <AspectRatio>
                    <img
                        src={href}
                        alt={text}
                        style={{width: '100%', height: 'auto', objectFit: "cover"}}
                    />
                </AspectRatio>
            </Card>
        );
    },
    blockquote({tokens}): string {
        const content = tokensToHTML(tokens);
        return renderToString(
            <Card
                variant="soft"
                color="neutral"
                sx={{
                    borderLeft: '4px solid',
                    borderRadius: 0,
                    borderColor: 'primary.500',
                    pl: 2,
                    py: 1,
                    my: 2
                }}
            >
                <CardContent>
                    <Typography level="body-md" sx={{fontStyle: 'italic'}}>
                        {content}
                    </Typography>
                </CardContent>
            </Card>
        );
    },
    code({text, lang}): string {
        return renderToString(
            <Highlight
                code={text}
                language={lang ?? ""}
            >
                {({style, tokens, getLineProps, getTokenProps}) => (
                    <Card sx={{p: 2, bgcolor: '#11171d'}}>
                                <pre style={{marginBlock: 0}}>
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({line})}>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({token})} />
                                        ))}
                                    </div>
                                ))}
                            </pre>
                    </Card>

                )}
            </Highlight>
        )
    }
}