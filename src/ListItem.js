import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";

const CardHeader = styled.div`
  font-weight: bold;
  font-size: 15px;
  padding: 10px;
`;

const DragItem = styled.div`
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: rgb(122, 92, 153);
  margin: 0 0 15px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
  min-width: 200px;
`;

const Text = styled.p`
  font-size: 13px;
  padding: 0 10px;
`;

//change bgColor accordingly
const divLineStyle = (bgColor) => ({
  width: "100%",
  backgroundColor: bgColor,
  color: "white",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  borderRadius: "0 0 10px 10px",
  height: "30px"
});

const ListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardHeader>{item.content}</CardHeader>
            <Text>{item.text}</Text>
            <div style={divLineStyle(item.color)}>
              <p>Reward</p>
              <p>$300</p>
            </div>
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
