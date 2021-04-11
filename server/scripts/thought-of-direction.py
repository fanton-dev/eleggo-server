import sys
import numpy as np
import tensorflow as tf
from pylsl import StreamInlet, resolve_stream

CHANNELS_COUNT = 8
FREQUENCY_CLIP = 60
MODEL_LOCATION = "scripts/models/thought_of_direction"
INPUT_SHAPE=(-1, 8, 60)

def main(left, none, right, prerequisite):
    with tf.device('/cpu:0'):
        exec(prerequisite)
        model = tf.keras.models.load_model(MODEL_LOCATION)

        stream = resolve_stream('type', 'EEG')[0]
        inlet = StreamInlet(stream)

        while (True):
            fft_data = []
            for _ in range(CHANNELS_COUNT):
                sample, _ = inlet.pull_sample()
                fft_data.append(sample[:FREQUENCY_CLIP])
            print(len(fft_data[0]))
            fft_data = np.array(fft_data).reshape(INPUT_SHAPE)
            prediction = model.predict(fft_data)
            print(prediction)
            n = np.argmax(prediction)
            if n == 0: exec(left)
            elif n == 1: exec(none)
            elif n == 2: exec(right)


if __name__ == '__main__':
    left = sys.argv[1]
    none = sys.argv[2]
    right = sys.argv[3]
    prerequisite = sys.argv[4]
    main(left, none, right, prerequisite)
