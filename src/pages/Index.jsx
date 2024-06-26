import React, { useState } from "react";
import { Container, VStack, Box, Text, Button, Grid } from "@chakra-ui/react";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(calculateWinner(newBoard));
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const renderSquare = (index) => (
    <Box
      as="button"
      w="100px"
      h="100px"
      bg="gray.200"
      border="1px solid"
      borderColor="gray.400"
      fontSize="2xl"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </Box>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <Container centerContent>
      <VStack spacing={4}>
        <Text fontSize="3xl">Tic Tac Toe</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={1}>
          {board.map((_, index) => renderSquare(index))}
        </Grid>
        {winner && <Text fontSize="2xl">{`Winner: ${winner}`}</Text>}
        <Button onClick={resetGame} colorScheme="teal">
          Reset Game
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;