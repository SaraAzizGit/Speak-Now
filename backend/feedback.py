# not needed anymore




from facial_expression_data_analysis import nervousness_in_expressions, confidence_in_expressions
from audio_data_analysis import nervousness_in_speech, confidence_in_speech
import matplotlib.pyplot as plt # for plotting a pie chart

# compiling results from expression and speech analysis
nervousness = nervousness_in_expressions + nervousness_in_speech
confidence = confidence_in_expressions + confidence_in_speech

levels = [nervousness, confidence]
labels = ["nervousness", "confidence"]

if (nervousness > confidence):
    explode = [0, 0.05]
else:
    explode = [0.05, 0]

plt.pie(levels, labels=labels, autopct='%.2f%%', explode=explode, startangle=90)
plt.title("Feedback")
plt.show()