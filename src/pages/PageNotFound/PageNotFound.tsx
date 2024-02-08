import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.scss";

export function PageNotFound() {
  const faceRef = useRef<HTMLDivElement>(null);
  const noseRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const face = faceRef.current;
    const nose = noseRef.current;
    const head = headRef.current;
    const leftPupil = leftPupilRef.current;
    const rightPupil = rightPupilRef.current;
    const container = document.body;

    let isOverFace = false;

    function handleMouseEnter() {
      isOverFace = true;
    }

    function handleMouseLeave() {
      isOverFace = false;
    }

    function handleMouseMove(event: MouseEvent) {
      moveElements(event);
    }

    function moveElements(event: MouseEvent) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const faceOffsetX = calculateOffset(mouseX, 10);
      const faceOffsetY = calculateOffset(mouseY, 10);
      const noseOffsetX = calculateOffset(mouseX, 15);
      const noseOffsetY = calculateOffset(mouseY, 15);
      const headOffsetX = calculateOffset(mouseX, 5);
      const headOffsetY = calculateOffset(mouseY, 5);

      if (!isOverFace) {
        face!.style.transform = `translate(${faceOffsetX}px, ${faceOffsetY}px)`;
        nose!.style.transform = `translate(${noseOffsetX}px, ${noseOffsetY}px)`;
        head!.style.transform = `translate(${headOffsetX}px, ${headOffsetY}px)`;

        movePupil(leftPupil!, mouseX, mouseY, 2);
        movePupil(rightPupil!, mouseX, mouseY, 2);
      }
    }

    function calculateOffset(
      offset: number,
      sensitivity: number
    ) {
      return (
        (offset / window.innerWidth - 0.5) * sensitivity
      );
    }

    function movePupil(
      pupil: HTMLDivElement,
      mouseX: number,
      mouseY: number,
      sensitivity: number
    ) {
      const boundingRect = pupil.getBoundingClientRect();
      const pupilCenterX =
        boundingRect.left + boundingRect.width / 2;
      const pupilCenterY =
        boundingRect.top + boundingRect.height / 2;

      const deltaX = mouseX - pupilCenterX;
      const deltaY = mouseY - pupilCenterY;

      const angle = Math.atan2(deltaY, deltaX);
      const maxRadius =
        Math.min(boundingRect.width, boundingRect.height) /
        4;
      const radius = Math.min(
        Math.sqrt(deltaX ** 2 + deltaY ** 2),
        maxRadius
      );

      const offsetX =
        Math.cos(angle) * radius * sensitivity;
      const offsetY =
        Math.sin(angle) * radius * sensitivity;

      pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    if (face && nose && head && leftPupil && rightPupil) {
      face.addEventListener("mouseenter", handleMouseEnter);
      face.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener(
        "mousemove",
        handleMouseMove
      );

      return () => {
        face.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
        face.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
        container.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      };
    }
  }, []);

  const navigate = useNavigate();

  const goToHomePage = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.husky}>
          <div className={styles.mane}>
            <div className={styles.coat}></div>
          </div>
          <div className={styles.body}>
            <div className={styles.head} ref={headRef}>
              <div className={styles.ear}></div>
              <div className={styles.ear}></div>
              <div className={styles.face} ref={faceRef}>
                <div className={styles.eye} id="eye1">
                  <div
                    className={styles.pupil}
                    ref={leftPupilRef}
                  ></div>
                </div>
                <div className={styles.eye} id="eye2">
                  <div
                    className={styles.pupil}
                    ref={rightPupilRef}
                  ></div>
                </div>
                <div
                  className={styles.nose}
                  ref={noseRef}
                ></div>
                <div className={styles.mouth}>
                  <div className={styles.lips}></div>
                </div>
              </div>
            </div>
            <div className={styles.torso}></div>
          </div>
          <div className={styles.legs}>
            <div className={styles.frontLegs}>
              <div className={styles.leg}></div>
              <div className={styles.leg}></div>
            </div>
            <div className={styles.hindLeg}></div>
          </div>
          <div className={styles.tail}>
            <div className={styles.tail}>
              <div className={styles.tail}>
                <div className={styles.tail}>
                  <div className={styles.tail}>
                    <div className={styles.tail}>
                      <div className={styles.tail}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.main__title}
          onClick={goToHomePage}
        >
          Перейти на головну
        </div>
      </div>
    </>
  );
}
