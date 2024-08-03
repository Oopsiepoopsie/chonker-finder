import React from 'react';

// Adding shortcut notation component 

export type NotationProps = {
    word: string;
    letter: string;
    context: string;
}
/*bottom-line notation*/
export const Notation = (props: NotationProps) => {
    return (
        <div className="notation-block">
            <div className={"notation-word"}>{props.word}</div>
            {props.letter === "" ? null : <div className={"notation-letter"}>{props.letter}</div>}
            <span className={"notation-context"}>{props.context}</span>
        </div>
    )
}

