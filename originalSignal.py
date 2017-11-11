import numpy as np
from scipy.io.wavfile import read
from scipy import signal
import matplotlib.pyplot as plt
import matplotlib.axes as matax
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

    timeArray = np.arange(0, end-start, 1)
    timeArray = timeArray / sampFreq
    #timeArray = timeArray

    fig = plt.figure()
    #fig, axes = plt.subplots(nrows=2, ncols=1)
    ax1 = fig.add_axes( [0.12, 0.55, 0.75, 0.4] )
    ax2 = fig.add_axes( [0.12, 0.1, 0.75, 0.4] )
    ax3 = fig.add_axes( [0.88, 0.1, 0.02, 0.4] )
    
    #--- Figure 1. ---#
    ax1.plot(timeArray, s1)
    ax1.set_ylabel('Amplitude')
    ax1.set_xlim(0, duration)
    ax1.margins(x=0)
    
    #--- Figure 2. ---#
    f, t, Sxx = signal.spectrogram(s1, sampFreq, nperseg=512)
    im = ax2.pcolormesh(t, f/1000, safe_log(Sxx), cmap='jet' )

    ax2.set_ylabel('Frequency [kHz]')
    ax2.set_ylim(0,20)
    ax2.set_xlim(0, duration)
    ax2.set_xlabel('Time (s)')
    ax2.margins(x=0)

    im.set_clim(-10, 0)

    mappable = im
    cb = plt.colorbar(mappable = mappable, cax = ax3)
    cb.set_label('db/Hz')

    plt.show()

def safe_log(x):
    result = 0;
    try:
        result = np.log(x)
    except RuntimeWarning:
        result = 0;
    return result;

main();
