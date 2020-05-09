// winning conditions:
// check for rows
// 0 == 1 == 2,
// 3 == 4 == 5,
// 6 == 7 == 8,
// check for cols
// 0 == 3 == 6
// 1 == 4 == 7,
// 2 == 5 == 8,
// diagonals
// 0 == 4 == 8
// 2 == 4 == 6 

// GAME MODULE
const game = ( function() {

    let GAME_MATRIX, ACTIVE_PLAYER, TOTAL_MOVES=0, gameEnded = false, message='';

    const playerMarkers = {
        0: "O",
        1: "X",
    };

    const initializeGame = () => {
        GAME_MATRIX = new Array( 9 );
        ACTIVE_PLAYER = 0,
        TOTAL_MOVES=0;
        gameEnded = false;
        message='';
    };

    const updateMatrix = index => {
        GAME_MATRIX[ index ] = ACTIVE_PLAYER;
        checkWinningStatus();
    };

    const checkWinningStatus = ( index ) => {
        // check row
        for( let i=0; i<GAME_MATRIX.length; i+=3 ) {
            let i1 = GAME_MATRIX[ i ],
                i2 = GAME_MATRIX[ i + 1 ],
                i3 = GAME_MATRIX[ i + 2 ];
            if( i1 === i2 && i1 === i3 && i1 !== undefined ) {
                gameEnded = true;
                message = `Player-${ ACTIVE_PLAYER + 1 } has won!!`;
                return;
            }
        }

        //cols
        for( let i=0; i<3; i++ ) {
            let n = 3;
            let i1 = GAME_MATRIX[ i ],
                i2 = GAME_MATRIX[ i + 3 ],
                i3 = GAME_MATRIX[ i + 6 ];
            if( i1 === i2 && i1 === i3 && i1 !== undefined ) {
                gameEnded = true;
                message = `Player-${ ACTIVE_PLAYER + 1 } has won!!`;

                return;
            }
        }

        //diagonal
        if(
            ( GAME_MATRIX[0] === GAME_MATRIX[4] && GAME_MATRIX[ 0 ] === GAME_MATRIX[ 8 ] && GAME_MATRIX[0] !== undefined )
            ||
            ( GAME_MATRIX[2] === GAME_MATRIX[4] && GAME_MATRIX[ 2 ] === GAME_MATRIX[ 6 ] && GAME_MATRIX[2] !== undefined )
        ) {
            gameEnded = true;
            message = `Player-${ ACTIVE_PLAYER + 1 } has won!!`;
            return;
        }

        changePlayer();
    }

    const changePlayer = () => {
        ACTIVE_PLAYER = +!ACTIVE_PLAYER;
        TOTAL_MOVES++;
        if( TOTAL_MOVES === 9 ) {
            gameEnded = true;
            message = 'DRAW';
        }
    };

    const getGameVariables = () => {
        return {
            ACTIVE_PLAYER,
            GAME_MATRIX,
            TOTAL_MOVES,
            gameEnded,
            message
        };
    };

    const getActivePlayerMarker = () => playerMarkers[ ACTIVE_PLAYER ];

    return {
        getActivePlayerMarker,
        getGameVariables,
        updateMatrix,
        initializeGame
    }
} )();