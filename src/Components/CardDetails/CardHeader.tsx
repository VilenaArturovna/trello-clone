import React, {ChangeEvent, useState} from "react";
import {changeCardTitle, removeCard} from "../../Redux/main-reducer";
import {Button, Title} from "./CardDetails"
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {userName} from "../../api/api";

type PropsType = {
    title: string
    id: string
    columnId: string
    closeModal: () => void
    columnTitle: string
}

export function CardHeader({title, columnTitle, columnId, id, closeModal}: PropsType) {
    const dispatch = useDispatch()
    const [cardTitle, setCardTitle] = useState<string>(title)
    const [editTitleMode, setEditTitleMode] = useState<boolean>(false)
    const activateEditTitleMode = () => {
        setEditTitleMode(true)
    }
    const deactivateEditTitleMode = (e: ChangeEvent<HTMLInputElement>) => {
        setEditTitleMode(false)
        dispatch(changeCardTitle(id, columnId, cardTitle))
    }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCardTitle(e.currentTarget.value)
    }
    const deleteCard = () => {
        dispatch(removeCard(id, columnId))
        closeModal()
    }
    return (
        <Header>
            <div>
                {!editTitleMode ? (
                    <Title onClick={activateEditTitleMode}>
                        {title}
                    </Title>
                ) : (
                    <div>
                        <InputCardTitle
                            onChange={onTitleChange}
                            autoFocus
                            onBlur={deactivateEditTitleMode}
                            value={cardTitle}
                        />
                    </div>
                )}
                <HeaderInlineContent>
                    column: {columnTitle}
                </HeaderInlineContent>
                <HeaderInlineContent>
                    author: {userName}
                </HeaderInlineContent>
            </div>
            <Button onClick={deleteCard}>
                Remove card
            </Button>
        </Header>

    )
}

const Header = styled.div`
  margin: 22px 40px 20px 0;
  min-height: 32px;
  position: relative;
  display: flex;
  justify-content: space-between;
`

const HeaderInlineContent = styled.div`
  cursor: default;
  margin: 4px 8px 4px 2px;
  font-size: 12px;
`
const InputCardTitle = styled.input`
  width: 100%;
  margin-top: 8px;
  font-size: 24px;
`
