import { useState } from "react";

function Child({
  index,
  turn,
  handleTurnChange,
  clickedIndex,
  setclickedIndex,
  clickedIndexes,
  setclickedIndexes,
  winnerChoose,
  setwinnerChooseObj,
  setWinnerText,
}) {
  let playersSign = {
    playerA: "X",
    playerB: "O",
  };
  console.log(clickedIndexes, "clickedIndexes");
  console.log(winnerChoose, "winnerchooseobj");

  return (
    <>
      <button
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
        }}
        onClick={() => {
          setclickedIndex({
            index: index,
            sign: playersSign[turn],
          });
          handleTurnChange();
          const indexes = [...clickedIndexes];
          setclickedIndexes([
            ...indexes,
            {
              index: index,
              sign: playersSign[turn],
            },
          ]);
          ///find all the indexgruop that has the index and update the count of the current player
          const transformedObj = [...winnerChoose];
          transformedObj.map((item) => {
            if (item.indexGroup.includes(index)) {
              if (turn === "playerA") {
                item.countA += 1;
              } else {
                item.countB += 1;
              }
            }
          });
          const anyThreePresent = transformedObj.find(
            (item) => item.countA === 3 || item.countB === 3
          );
          if (anyThreePresent) {
            setWinnerText(`${turn} won`);
          }
          if (clickedIndexes.length === 9) {
            setWinnerText("Draw");
          }

          setwinnerChooseObj(transformedObj);
        }}
      >
        <div style={{ fontSize: "40px" }}>
          {clickedIndexes?.find((item) => item.index === index)?.sign ?? ""}
        </div>
      </button>
    </>
  );
}

function TicTacToe() {
  const [winnerText, setWinnerText] = useState("");
  const [clickedIndex, setclickedIndex] = useState();
  const [clickedIndexes, setclickedIndexes] = useState([]);

  const [turn, setTurn] = useState("playerA");
  const handleTurnChange = () => {
    if (turn === "playerA") {
      setTurn("playerB");
    } else {
      setTurn("playerA");
    }
  };
  //find whose turn
  //find sign
  const winnerChoose = [
    { indexGroup: [0, 1, 2], countA: 0, countB: 0 },
    { indexGroup: [3, 4, 5], countA: 0, countB: 0 },
    { indexGroup: [6, 7, 8], countA: 0, countB: 0 },
    { indexGroup: [0, 3, 6], countA: 0, countB: 0 },
    { indexGroup: [1, 4, 7], countA: 0, countB: 0 },
    { indexGroup: [2, 5, 8], countA: 0, countB: 0 },
    { indexGroup: [0, 4, 8], countA: 0, countB: 0 },
    { indexGroup: [2, 4, 6], countA: 0, countB: 0 },
  ];
  const [winnerChooseObj, setwinnerChooseObj] = useState(winnerChoose);
  return (
    <>
      {/* <div>Player A: {playersSign["playerA"]}</div>
      <div>Player B: {playersSign["playerB"]}</div> */}
      Turn: {turn}
      <div
        style={{
          padding: "4px",
          width: "300px",
          height: "300px",
          backgroundColor: "red",
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gridTemplateRows: "repeat(3,1fr)",
          borderRadius: "20px",
          border: "2px solid red",
          gap: "8px",
        }}
      >
        {Array(9)
          .fill(0)
          .map((_, index) => index)
          .map((index) => {
            return (
              <Child
                key={index}
                index={index}
                turn={turn}
                handleTurnChange={handleTurnChange}
                clickedIndex={clickedIndex}
                setclickedIndex={setclickedIndex}
                clickedIndexes={clickedIndexes}
                setclickedIndexes={setclickedIndexes}
                winnerChoose={winnerChooseObj}
                setwinnerChooseObj={setwinnerChooseObj}
                setWinnerText={setWinnerText}
              />
            );
          })}
      </div>
      <p style={{ fontSize: "50px", color: "orangered" }}>
        {" "}
        {winnerText.toUpperCase()}
      </p>
      {clickedIndexes.length === 9 && (
        <>
          {" "}
          <p style={{ fontSize: "50px", color: "orangered" }}> DRAW</p>
          <button
            onClick={() => {
              setwinnerChooseObj(winnerChoose);
              setclickedIndexes([]);
            }}
          >
            Restart
          </button>
        </>
      )}
    </>
  );
}

export default TicTacToe;
