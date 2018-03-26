import csv
import sys
import pprint
 
# Function to convert a csv file to a list of dictionaries.  
# Takes in one variable called "variables_file"
def csv_dict_list(variables_file):
     
    # Open variable-based csv, 
    # iterate over the rows and map values to a list of dictionaries 
    # containing key/value pairs
    reader = csv.DictReader(open(variables_file, "r"))
    dict_list = []
    for line in reader:
        dict_list.append(line)
    return dict_list

# Calls the csv_dict_list function, passing the named csv
def parseAll():
    unit7 = csv_dict_list("../locationData/unit7.csv")
    unit8 = csv_dict_list("../locationData/unit8.csv")
    unit13 = csv_dict_list("../locationData/unit13.csv")
    unit20 = csv_dict_list("../locationData/unit20.csv")
