const socket = io();
const videoGrid = document.getElementById('video-grid');

// The Peer object is where we create and receive connections.
// PeerJS uses the cloud PeerServer for session metadata and candidate signaling.
// Other peers can connect to this peer using the provided ID. If no ID is given, one will be generated by the brokering server.
const myPeer = new Peer();

// creates the HTML element specified by tagName
// tagName is a string that specifies the type of element to be created.
// the 'video' html element embeds a media player which supports video playback into the document.
const myVideo = document.createElement('video');
myVideo.muted = true;
myVideo.style.marge = "10px";
const peers = {};


const mute = (myVideo) => {
    console.log('muting');
    const audioTrack = myVideo.srcObject.getTracks().find(t => t.kind === 'audio');
    audioTrack.enabled = false;
}

const unMute = (myVideo) => {
    console.log('un-muting');
    const audioTrack = myVideo.srcObject.getTracks().find(t => t.kind === 'audio');
    audioTrack.enabled = true;
}

const startVideo = (myVideo) => {
    console.log('starting video');
    const videoTrack = myVideo.srcObject.getTracks().find(t => t.kind === 'video');
    videoTrack.enabled = true;
}

const stopVideo = (myVideo) => {
    console.log('stopping video');
    const videoTrack = myVideo.srcObject.getTracks().find(t => t.kind === 'video');
    videoTrack.enabled = false;
}

const leaveCall = (myVideo) => {
    myVideo.remove();
}

/**
 * mediaDevices:    The MediaDevices interface provides access to connected media input devices like cameras and microphones,
 *                  as well as screen sharing. In essence, it lets you obtain access to any hardware source of media data.
 * getUserMedia:    With the user's permission through a prompt, turns on a camera and/or a microphone on the system and
 *                  provides a MediaStream containing a video track and/or an audio track with the input.
 */
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream) => {
    // set up the stream and add it to the webpage
    addVideoStream(myVideo, stream);

    // When a peer calls you, the call event is emitted.
    // The call must be answered or no connection is established.
    myPeer.on('call', (call) => {
        // Answer the call, providing our mediaStream
        call.answer(stream);
        // create a new video HTML element
        const video = document.createElement('video');
        // `userVideoStream` is the MediaStream of the remote peer
        call.on('stream', (userVideoStream) => {
            // set up the remote users stream and add it to the webpage as well
            addVideoStream(video, userVideoStream);
        })
    })

    // server successfully connected
    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
    })
})

// server disconnected socket 
socket.on('user-disconnected', (userId) => {
    if (peers[userId]) peers[userId].close();
})

// Every Peer object is assigned a random, unique ID when it's created.
myPeer.on('open', (id) => {
    console.log('my peer ', id, ' is joining room ', ROOM_ID);
    socket.emit('join-room', ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
    // Call another peer by calling peer.call with the peer ID of the destination peer. When a peer calls you, the call event is emitted.
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    //peer.call and the callback of the call event provide a MediaConnection object.
    // The MediaConnection object itself emits a stream event whose callback includes the video/audio stream of the other peer.
    call.on('stream', (otherUserVideoStream) => {
        // add peers video stream to our grid
        addVideoStream(video, otherUserVideoStream);
    });
    // Emitted when either you or the remote peer closes the data connection.
    call.on('close', () => {
        video.remove();
    })
    peers[userId] = call;
}

/**
 * Set the video element source to the devices video / audio stream.
 * Play the video once metadata has loaded. Finally, add the video to the video grid HTML element.
 * @param {HTMLVideoElement} video 
 * @param {MediaStream} stream 
 */
function addVideoStream(video, stream) {
    //The srcObject property of the HTMLMediaElement interface sets or returns the object which serves as the source of the media
    // associated with the HTMLMediaElement. The object can be a MediaStream, a MediaSource, a Blob, or a File
    video.srcObject = stream;
    // The loadedmetadata event is fired when the metadata has been loaded.
    video.addEventListener('loadedmetadata', () => {
        // attempts to begin playback of the media. It returns a Promise which is resolved when playback has been successfully started.
        video.play();
    })
    // The ParentNode.append() method inserts a set of Node objects or DOMString objects after the last child of the ParentNode
    videoGrid.append(video);
}
