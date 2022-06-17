import React from "react";
import Button from "@atlaskit/button";
import styled, { css } from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";
function ToDo({ todo, onCheckBtnClick }) {
  const ButtonStyled = styled(Button)`
    margin-top: 5px;
    text-align: left;
    &,
    &:hover {
      ${(p) =>
        p.iscompleted &&
        css`
          text-decoration: line-through;
        `}
    }
    &:hover {
      .check-icon {
        display: inline-block;
      }
    }
    .check-icon {
      display: none;
      &:hover {
        background-color: #e2e2e2;
        border-radius: 3px;
      }
    }
  `;
  return (
    <div>
      <ButtonStyled
        isCompleted={todo.iscompleted}
        shouldFitContainer
        iconAfter={
          !todo.iscompleted && (
            <span
              className="check-icon"
              onClick={() => onCheckBtnClick(todo.id)}
            >
              <CheckIcon primaryColor="#4fff4f" />
            </span>
          )
        }
      >
        {todo.name}
      </ButtonStyled>
    </div>
  );
}

export default ToDo;
