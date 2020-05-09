console.log( 'main.js is running' );


// dom manipulation;
const board = document.querySelector( '#board' );
// const resetButton = document.getElementsByClassName( 'reset' );

const initGame = () => {
    updateActivePlayerInDOM( 0 );
    board.innerHTML = '';
    for( let i=0; i<9; i++ ) {
        board.innerHTML+= '<div class="square align-center"></div>';
    }
    game.initializeGame();
}

const removeClass = ( nodes, className) => {
    document.querySelectorAll( nodes ).forEach( node => node.classList.remove(className) );
}

const updateActivePlayerInDOM = ( activePlayer ) => {
    removeClass( '.players span', 'active' );
    document.querySelector(`.players span[data-player="${activePlayer}"]`).classList.add('active');
    // removeClass( '.players span', 'active' );
    // document.querySelector('.players span[data-player="0"]').classList.add('active');
};

const triggerModal = ( toggleDisplay, message ) => {
    const modal = document.querySelector('#modal');
    if( toggleDisplay ) {
        modal.querySelector('.body-content').innerText = message;
        modal.classList.remove('hide')
    } else {
        modal.querySelector('.body-content').innerText = '';
        modal.classList.add('hide')
    }

}


board.addEventListener( 'click', evt => {
    const squareNodes = [ ...board.children ];
    const hasChildNode = evt.target.childNodes.length > 0;
    if( evt.target.classList[ 0 ] === 'square' && ! hasChildNode && !game.getGameVariables().gameEnded ) {
        const index = squareNodes.indexOf( evt.target );
        evt.target.innerText = game.getActivePlayerMarker();
        game.updateMatrix( index );

        updateActivePlayerInDOM( game.getGameVariables().ACTIVE_PLAYER );
        const { gameEnded, message } = game.getGameVariables();
        if( gameEnded ) {
            triggerModal( true, message );
        }
    }
}, false );

document.body.addEventListener( 'click', ( evt ) => {
    if( evt.target.className.includes( 'reset' ) ) {
        triggerModal( false );
        initGame();
    }
} );

initGame();