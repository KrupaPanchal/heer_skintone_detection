import cv2
import numpy as np

def extract_skin(face):
    ycrcb = cv2.cvtColor(face, cv2.COLOR_BGR2YCrCb)

    lower = np.array([0, 133, 77])
    upper = np.array([255, 173, 127])

    mask = cv2.inRange(ycrcb, lower, upper)
    skin = cv2.bitwise_and(face, face, mask=mask)

    return skin, mask
