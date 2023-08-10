import React, { Component, Dispatch } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import { Subtext013 } from '../utilities/Fonts';
import Colors from '../utilities/Color';

type Props = {
  dispatch: Dispatch<Action>;
  isVoiceMode: boolean;
};

type Action =
  | { type: 'SET_INPUT_TEXT'; payload: string }
  | { type: 'SET_IS_VOICE_MODE'; payload: boolean };

type State = {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: string;
  results: string[];
  partialResults: string[];
  isStarted: boolean;
  isVoiceMode: boolean;
};

class VoiceRecordButton extends Component<Props, State> {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
    isStarted: false,
    isVoiceMode: true,
  };

  constructor(props: Props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentDidMount() {
    this.setState({
      isVoiceMode: this.props.isVoiceMode,
    });
  }
  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
  handleInputTextChange = (text: string) => {
    // setInputText prop을 통해 전달된 setInputText 함수 호출
    this.props.dispatch({ type: 'SET_INPUT_TEXT', payload: text });
  };

  onClickInputMode = () => {
    this.setState({ isVoiceMode: !this.state.isVoiceMode }, () => {
      this.props.dispatch({ type: 'SET_IS_VOICE_MODE', payload: this.state.isVoiceMode });
    });
  }
  onSpeechStart = (e: any) => {
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = (e: any) => {
    this.setState({
      end: '√',
    });
  };

  onSpeechError = (e: SpeechErrorEvent) => {
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      this.setState({
        results: e.value,
      });
      this.handleInputTextChange(e.value[0]);
    }

  };

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      this.setState({
        partialResults: e.value,
      });
    }
  };

  onSpeechVolumeChanged = (e: any) => {
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
      isStarted: true,
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
    this.setState({ isStarted: false })
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };

  render() {
    return (
      <View style={voiceStyle.container}>
        <View style={voiceStyle.backgroundBar} />
        {this.state.isVoiceMode && (
          <TouchableOpacity style={voiceStyle.button} onPress={this.state.isStarted ? this._stopRecognizing : this._startRecognizing}>
            <View style={voiceStyle.innerButton}>
              <Ionicons name={this.state.isStarted ? 'stop' : 'mic-outline'} size={30} color={Colors.WHITE} />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={voiceStyle.sideButton} onPress={this.onClickInputMode}>
          <Ionicons name={this.state.isVoiceMode ? 'keypad' : 'mic'} size={30} color={Colors.MAINGREEN} />
          <Subtext013 text={this.state.isVoiceMode ? "키보드 모드" : "음성 모드"} color={Colors.MAINGREEN} />
        </TouchableOpacity>
      </View>
    );
  }
}
const voiceStyle = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
  },
  backgroundBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.GRAY09,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    height: 59,
    width: '100%',
  },
  button: {
    width: 102,
    height: 102,
    borderRadius: 50,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: Colors.GRAY09,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 10,
  },
  innerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.MAINGREEN,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: Colors.GRAY09,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  sideButton: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    marginRight: 30,
  }
});

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});


export default VoiceRecordButton;