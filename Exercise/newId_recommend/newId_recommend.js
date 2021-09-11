function solution(id) {
    id = id.toLowerCase()
        .split('')
        .filter(el => 'abcdefghijklmnopqrstuvwxyz1234567890-_.'.includes(el)).join('');
    
    while ( id.includes('..') ) {
        id = id.replace('..', '.');
    };
    id = id.split('');
        
    if ( id[0] === '.' ) {
        id.shift();
    } else if ( id[id.length - 1] === '.' ) {
        id.pop();
    }
    
    id = id.join('');
    id.length === 0 ? id += 'a' : id = id;
    id.length > 15 ? id = id.substr(0, 15) : id = id;
    id = id.split('');
    
    if ( id[0] === '.' ) {
        id.shift();
    } else if ( id[id.length - 1] === '.' ) {
        id.pop();
    }

    if ( id.length < 3 ) {
        while ( id.length !== 3 ) {
            id.push(id[id.length - 1]);
        }
    }
    
    return id.join('');
}
