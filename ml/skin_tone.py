import cv2
import numpy as np

def get_skin_tone_and_undertone(skin, mask):
    pixels = skin[mask > 0]

    if len(pixels) < 100:
        return "Unknown", "Unknown"

    # Convert to YCrCb
    ycrcb = cv2.cvtColor(
        pixels.reshape(-1, 1, 3), cv2.COLOR_BGR2YCrCb
    )

    Y = np.mean(ycrcb[:, :, 0])   # Brightness
    Cr = np.mean(ycrcb[:, :, 1])  # Red component
    Cb = np.mean(ycrcb[:, :, 2])  # Blue component

    print("Y:", Y, "Cr:", Cr, "Cb:", Cb)

    # ---- SKIN TONE ----
    if Y > 190:
        tone = "Very Fair"
    elif Y > 165:
        tone = "Fair"
    elif Y > 135:
        tone = "Medium"
    elif Y > 110:
        tone = "Olive"
    else:
        tone = "Dark"

    # ---- UNDERTONE ----
    if Cr > Cb + 8:
        undertone = "Warm"
    elif Cb > Cr + 8:
        undertone = "Cool"
    else:
        undertone = "Neutral"

    return tone, undertone
