def detect_makeup(image):
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    saturation = hsv[:, :, 1].mean()

    if saturation > 120:
        return True
    return False
