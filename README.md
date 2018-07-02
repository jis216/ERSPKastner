# Repo for ERSP Kastner group

## Contributors:
Bilguun Bulgan

Caitlyn Liu

Isaac Castillo

Jiayue Sun

## Instructors:
Ryan Kastner

Perry Naughton

## USER GUIDE
Thanks for checking out our work! This is a research project that involves recovering the location of a snapping shrimp, given the acoustic record of the snapping shrimp sound and locations of the sensors that recorded the sound. Please follow the following steps if you plan to view, modify or run the code for this research.

## Download
All of our code is in the Github Repository: 
https://github.com/jis216/ERSPKastner

This is a forked repository of the original repo that clean and wrapped up the code in a more reader-friendly way. You can go to the original one to see all the intermediate files and documentation we generated during development process.
Setup
Python 3.6.5
Jupyter notebook

Since most of our code is in the form of a Jupyter Notebook, whose cells are documented with all the explanation you need to understand the code. Please install jupyter notebook and Python 3.6.5 if you wanted to view and modify the code on your own machine.

## File Functionalities
There are three notebooks you need to read

### part1_snapDetection.ipynb
A notebook highlighting ways to isolate a shrimp sound from other noises, and how we can use reflected arrivals to determine the location of a shrimp along a 2D plane.

### part2_snapCorrelation.ipynb
In this notebook you can generated the plots that show peak detection across four AUVs and how the csv files in PeakTImeLocationData are generated.

### part3_shrimpEstimation.ipynb
In this notebook we present one model for recovering the position of a snapping shrimp. In this model, we do gradient descent over the loss function that is the least squares of time difference between signal arrivals. The plots that show how radius and noise will influence the estimation results are also listed.

### part4_realShrimpEstimation.ipynb
In this notebook, we run our algorithm from part3 on real_data that has been collected.

## Data
All the data we used are in the two folders locationData/ and PeakTimeLocationData/

### locationData/	csv files that record the locations of four AUVs over time. 
time_wav5.csv

start time and end time of the wave file in seconds

unit[7,8,13,20].csv

record the AUV information during the time period in time _wav5.csv. (GPS_time, x, y positions and depth)
			
### PeakTimeLocationData/
Unit[7,8,13,20]PeakTimes.csv

first column is the start time of the peak and the second column is the end time of the peak.
