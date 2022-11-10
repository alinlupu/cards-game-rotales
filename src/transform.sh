#!/bin/bash

j="0"
for i in `ls`
do
    ((j++))
    echo "$j,$i" >> "cards.csv"
done
