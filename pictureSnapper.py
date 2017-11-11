import numpy as np
from scipy.io.wavfile import read
from scipy import signal
import matplotlib.pyplot as plt
import matplotlib.axes as matax
import sys

# this function takes 4 args and this file should be in the same 
# directory as your wav1.wav file 
# run the script as follows:
#
# mkdir pictures 
# python pictureSnapper.py [start time in seconds] [end time in seconds] [duration of a single picture] [directory to save your pics in]
# 
# for example, if you want to run the code from 1:00 - 2:30 and have a picture
# of every 5 seconds, run as follows:
#
# mkdir pictures (only do this step the first time)
# python pictureSnapper.py 60 150 5 pictures  

def main():

    #sampFreq = Number of samples per second. In our case, 65501.
    sampFreq, snd = read('wav1.wav')
    #snd = snd;
    #initial time.
    initTime = int(sys.argv[1]); #seconds
    endTime = int(sys.argv[2]); #seconds
    duration = int(sys.argv[3]); #seconds
    directory = sys.argv[4]; #directory to save images

    for i in range(initTime, endTime, duration ):
        start = sampFreq * i; #65501
        end = start + sampFreq * duration; #131002
        #length = end - start
        s1 = snd[start:end]
	s1 = np.append(s1, [1200, -1200])
	#print(s1)

        #points = len(s1);

	timeArray = np.arange(0, end-start + 2, 1)
	#np.append(timeArray, end-start)
        timeArray = timeArray /float(sampFreq)
	#print(timeArray)
        
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
        f, t, Sxx = signal.spectrogram(s1, sampFreq, nperseg=256)
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

        d = "%s/%i_%i.png"%(directory, i, i+duration)
        fig.savefig(d)
        plt.close(fig) 
        #plt.show()

def safe_log(x):
    result = 0
    try:
        result = np.log(x)
    except RuntimeWarning:
        result = 0
    return result

main()
