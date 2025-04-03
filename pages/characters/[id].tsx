import {API} from "assets/api/api";
import type {CharacterType} from "assets/api/rick-and-morty-api";
import {PageWrapper} from "components/PageWrapper/PageWrapper";
import {CharacterCard} from "components/Card/CharacterCard/CharacterCard";
import {getLayout} from "components/Layout/BaseLayout/BaseLayout";
import {GetStaticProps, GetStaticPaths} from "next";
import styled from "styled-components";
import {useRouter} from "next/router";

export const getStaticPaths: GetStaticPaths = async () => {
    const {results} = await API.rickAndMorty.getCharacters()

    const paths = results.map(character => ({
        params: {id: String(character.id)}
    }))

    return {
        paths,
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params || {}

    const character = await API.rickAndMorty.getCharacter(id as string);

    if (!character) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            character
        }
    }
}

type PropsType = {
    character: CharacterType
}

const Character = (props: PropsType) => {
    const {character} = props;

    const router = useRouter();

    const characterId = router.query.id

    const goToCharacters = () => {
        router.push(`/characters`);
    }

    return (
        <>
            <PageWrapper>
                <Container>
                <IdText>ID: {characterId}</IdText>
                <CharacterCard key={character.id} character={character}/>
                <Button onClick={goToCharacters}>GO TO CHARACTERS</Button>
                </Container>
            </PageWrapper>
        </>
    )
}

Character.getLayout = getLayout
export default Character

const IdText = styled.div`
    font-size: 40px;
`

const Button = styled.button`
    width: 330px;
    height: 60px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    background: rgba(242, 183, 251, 0.98);

    &:hover {
        background: #c55fe6;
        color: #fff;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
`
