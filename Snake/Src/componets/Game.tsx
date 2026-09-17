import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, PanResponder, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../styles/colors';


const MOVE_INTERVAL = 50; 
const SCORE_INCREMENT = 5;
const GRID_SIZE = 20; 
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height - 90; 
 
const GAME_BOUNDS = {
  x: 0,
  y: 0,
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  gridWidth: Math.floor(SCREEN_WIDTH / GRID_SIZE),
  gridHeight: Math.floor(SCREEN_HEIGHT / GRID_SIZE),
};

interface Position {
  x: number;
  y: number;
}

interface SnakeSegment extends Position {}

export default function Game() {
  // Game state
  const [snake, setSnake] = useState<SnakeSegment[]>([]);
  const [food, setFood] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState<{ x: number; y: number }>({ x: 1, y: 0 });
  const [gameRunning, setGameRunning] = useState(true);
  const [restartToken, setRestartToken] = useState(0);

  // Refs
  const panResponderRef = useRef<any>(null);
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextDirectionRef = useRef({ x: 1, y: 0 });
  const currentDirectionRef = useRef({ x: 1, y: 0 });

  // Initialize PanResponder on mount
  useEffect(() => {
    panResponderRef.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (event, { dx, dy, x0, y0 }) => {
        try {
          console.log(`📍 Touch: X=${Math.round(x0)}, Y=${Math.round(y0)} | Move: dX=${Math.round(dx)}, dY=${Math.round(dy)}`);
        } catch (err) {
          console.log('Error logging touch:', err);
        }
      },

      onPanResponderRelease: (event, { dx, dy }) => {
        try {
          const threshold = 30;
          const current = currentDirectionRef.current;

          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
            if (dx > 0 && current.x === 0) {
              // Only allow right if not moving vertically
              console.log('➡️ SWIPE RIGHT');
              nextDirectionRef.current = { x: 1, y: 0 };
            } else if (dx < 0 && current.x === 0) {
              // Only allow left if not moving vertically
              console.log('⬅️ SWIPE LEFT');
              nextDirectionRef.current = { x: -1, y: 0 };
            }
          } else if (Math.abs(dy) > threshold) {
            if (dy > 0 && current.y === 0) {
              // Only allow down if not moving horizontally
              console.log('⬇️ SWIPE DOWN');
              nextDirectionRef.current = { x: 0, y: 1 };
            } else if (dy < 0 && current.y === 0) {
              // Only allow up if not moving horizontally
              console.log('⬆️ SWIPE UP');
              nextDirectionRef.current = { x: 0, y: -1 };
            }
          }
        } catch (err) {
          console.log('Error handling swipe:', err);
        }
      },
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [restartToken]);

  // Initialize snake and food
  const initializeGame = () => {
    // Initial snake position (center of screen)
    const startX = Math.floor(GAME_BOUNDS.gridWidth / 2);
    const startY = Math.floor(GAME_BOUNDS.gridHeight / 2);
    const initialSnake: SnakeSegment[] = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ];

    setSnake(initialSnake);
    setScore(0);
    setDirection({ x: 1, y: 0 });
    nextDirectionRef.current = { x: 1, y: 0 };

    // Generate initial food
    const randomFood = generateFood(initialSnake);
    setFood(randomFood);

    console.log('🎮 Game Initialized!');
    console.log(`📐 Game Bounds: ${GAME_BOUNDS.gridWidth}x${GAME_BOUNDS.gridHeight} grid`);
    console.log(`🐍 Snake Start: ${initialSnake[0].x}, ${initialSnake[0].y}`);
    console.log(`🍎 Food Start: ${randomFood.x}, ${randomFood.y}`);
    console.log(`⚙️ Move Interval: ${MOVE_INTERVAL}ms, Score +${SCORE_INCREMENT}`);
  };

  const resetGame = () => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }

    setGameRunning(true);
    setRestartToken((prev) => prev + 1);
  };

  // Generate random food position
  const generateFood = (snakeBody: SnakeSegment[]): Position => {
    let newFood: Position = { x: 0, y: 0 };
    let isOnSnake = true;

    while (isOnSnake) {
      newFood = {
        x: Math.floor(Math.random() * GAME_BOUNDS.gridWidth),
        y: Math.floor(Math.random() * GAME_BOUNDS.gridHeight),
      };

      isOnSnake = snakeBody.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
    }

    return newFood;
  };

  
  useEffect(() => {
    if (!gameRunning) return;

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        if (prevSnake.length === 0) return prevSnake;

        const head = prevSnake[0];
        const newDirection = nextDirectionRef.current;

        currentDirectionRef.current = newDirection;

        const newHeadX = (head.x + newDirection.x + GAME_BOUNDS.gridWidth) % GAME_BOUNDS.gridWidth;
        const newHeadY = (head.y + newDirection.y + GAME_BOUNDS.gridHeight) % GAME_BOUNDS.gridHeight;

        const newSnake = [{ x: newHeadX, y: newHeadY }, ...prevSnake];

       
        if (newHeadX === food.x && newHeadY === food.y) {
          console.log(`🍎 Food Eaten! Score: +${SCORE_INCREMENT}`);
          setScore((prev) => prev + SCORE_INCREMENT);
          const newFood = generateFood(newSnake);
          setFood(newFood);
          console.log(`🍎 New Food: ${newFood.x}, ${newFood.y}`);
        } else {
          
          newSnake.pop();
        }

        // Check collision with itself
        const newHead = newSnake[0];
        const collision = newSnake.slice(1).some((segment) => segment.x === newHead.x && segment.y === newHead.y);

        if (collision) {
          console.log(`💀 Game Over! Final Score: ${score}`);
          setGameRunning(false);
        }

        
        setDirection(newDirection);

        return newSnake;
      });
    }, MOVE_INTERVAL);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameRunning, food, score, restartToken]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.score}>Score: {score}</Text>
        <View style={styles.headerRight}>
          <Text style={styles.status}>{gameRunning ? '🎮 Playing' : '💀 Game Over'}</Text>
          <Pressable style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.gameBoard} {...(panResponderRef.current?.panHandlers ?? {})}>
        {/* Render snake */}
        {snake.map((segment, index) => (
          <View
            key={index}
            style={[
              styles.snakeSegment,
              {
                left: segment.x * GRID_SIZE,
                top: segment.y * GRID_SIZE,
                backgroundColor: index === 0 ? '#00ff00' : '#00cc00',
              },
            ]}
          />
        ))}

        {/* Render food */}
        <View
          style={[
            styles.food,
            {
              left: food.x * GRID_SIZE,
              top: food.y * GRID_SIZE,
            },
          ]}
        />

        <Text style={styles.gameText}>Swipe to move snake</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  status: {
    fontSize: 18,
    color: '#4ade80',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resetButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#627193',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  gameBoard: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  snakeSegment: {
    position: 'absolute',
    width: GRID_SIZE - 1,
    height: GRID_SIZE - 1,
    borderRadius: 2,
  },
  food: {
    position: 'absolute',
    width: GRID_SIZE - 1,
    height: GRID_SIZE - 1,
    backgroundColor: '#ff4444',
    borderRadius: GRID_SIZE / 2,
  },
  gameText: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    color: '#666',
    fontSize: 14,
  },
  gestureArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#ccc',
  },
});