import * as React from "react";
import { PlaceholderContainer, PlaceholderParagraph } from "./PlaceholderStyle";
interface IPlaceholder {
    title: string,
    subTitle: string
}

const Placeholder: React.FC<IPlaceholder> = (props: IPlaceholder) => {
    const { title, subTitle } = props;

    return (
        <PlaceholderContainer>
            <img
                alt="No data"
                src={require("../../assets/search.svg")}
            />
            {/* <PlaceholderParagraph>
                <>
                {{ title }}
                {{ subTitle }}
                </>
            </PlaceholderParagraph> */}
        </PlaceholderContainer>
    );
};

export default Placeholder;
