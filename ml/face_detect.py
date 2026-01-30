import cv2

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

def get_face(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    if len(faces) == 0:
        return None, "NO_FACE"

    h, w, _ = image.shape
    x, y, fw, fh = faces[0]

    face_area = fw * fh
    image_area = h * w

    # Reject full-body images
    if face_area / image_area < 0.08:
        return None, "FULL_BODY"

    face = image[y:y+fh, x:x+fw]
    return face, "OK"
