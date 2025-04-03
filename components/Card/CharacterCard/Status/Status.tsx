import type {CharacterStatusType} from "assets/api/rick-and-morty-api";
import Image, {StaticImageData} from "next/image";

type Props = {
status: CharacterStatusType;
src: StaticImageData
};
export const Status = (props: Props) => {
    const {src} = props;

    return (
<Image src={src} alt={''} width={16} height={16} />
    );
};