import { MusicSessionAudio } from '../js/pomodoro/pomodoroManager/MusicSessionAudio/MusicSessionAudio';
const path = require('path');

describe('MusicSessionAudio', () => {
  describe('play', () => {
    test('MusicSessionAudio.play()したとき、Audioがループ再生すること', () => {
      var audio = new Audio();
      var musicSessionAudio = new MusicSessionAudio(audio);
      var sources = ["0.mp3", "1.mp3"];
      musicSessionAudio.sources = sources;

      audio.play = jest.fn();

      musicSessionAudio.play();
      expect(audio.play.mock.calls.length).toBe(1);
      expect(path.basename(audio.src)).toBe("0.mp3");

      audio.dispatchEvent(new Event("ended"));
      expect(audio.play.mock.calls.length).toBe(2);
      expect(path.basename(audio.src)).toBe("1.mp3");

      audio.dispatchEvent(new Event("ended"));
      expect(audio.play.mock.calls.length).toBe(3);
      expect(path.basename(audio.src)).toBe("0.mp3");

      audio.dispatchEvent(new Event("ended"));
      expect(audio.play.mock.calls.length).toBe(4);
      expect(path.basename(audio.src)).toBe("1.mp3");
    });

    test('曲再生途中でpause後、playしたとき、曲が変わらないこと', () => {
      var audio = new Audio();
      var musicSessionAudio = new MusicSessionAudio(audio);
      var sources = ["0.mp3", "1.mp3"];
      musicSessionAudio.sources = sources;

      audio.play = jest.fn();
      audio.pause = jest.fn();

      musicSessionAudio.play();
      expect(path.basename(audio.src)).toBe("0.mp3");

      musicSessionAudio.pause();
      musicSessionAudio.play();
      expect(path.basename(audio.src)).toBe("0.mp3");
    });
  });
});
