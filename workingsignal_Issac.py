import numpy as np
from scipy.io.wavfile import read
from scipy import signal
import matplotlib.pyplot as plt
import sys

def main():
    #sampFreq = Number of samples per second. In our case, 65501.
    sampFreq, snd = read('wav1.wav')
    #snd = snd;
    #initial time.
    initTime = int(sys.argv[1]); #seconds
    duration = int(sys.argv[2]); #seconds
    start = sampFreq * initTime; #65501
    end = start + sampFreq * duration; #131002
    #length = end - start
    s1 = snd[start:end]

    #points = len(s1);

    timeArray = np.arange(start, end, 1)
    timeArray = timeArray / sampFreq
    #timeArray = timeArray

    fig = plt.figure()

    #--- Figure 1. ---#
    ax1 = fig.add_subplot(211)
    #plt.title('Signal Wave')
    ax1.plot(timeArray, s1)
    plt.ylabel('Amplitude')


    #--- Figure 2. ---#
    ax2 = fig.add_subplot(212)
    f, t, Sxx = signal.spectrogram(s1, sampFreq, nperseg=512)


    plt.pcolormesh(t, f/1000, safe_log(Sxx))
    plt.ylabel('Frequency [kHz]')
    plt.ylim(0,20);
    plt.xlabel('Time (s)')
    plt.clim(-10, 0)
    #cb = plt.colorbar()
    #cb.set_label('db/Hz')

    plt.show(1)

def safe_log(x):
    result = 0;
    try:
        result = np.log(x)
    except RuntimeWarning:
        result = 0;
    return result;

main();
