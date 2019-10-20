import React from 'react';

export default function ChecklistDisplayComponent(props) {
    return (
        <div>
            <h3>To-Do List</h3>
            <ul>
                {props.list.map((item) => (
                    // when creating list in react (using .map), must add key prop to each of the items iterating over
                    <li key={item.name}>
                        <div className="row">
                            <div className="column">
                                <span className="list-text">{item.name}</span>
                            </div>
                            <div className="column">
                                <button className="list-item-ghost-button" onClick={() => props.onRemoveItem(item.name)}>Complete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}