import React from 'react'
import styles from './Hero.module.css';
import { FaStarOfLife } from 'react-icons/fa';
function Hero() {
  return (
    <div className={styles.hero}>
        <div className={styles.text}>
            <h1>Limitless learning at your fingertips </h1>
            <p>Online learning and teaching marketplace with 5K+ courses & 10M students. Taught by experts to help you acquire new skills.</p>
            <div className={styles.star}>
            
                <span><FaStarOfLife className={styles.icon}/>Learn with experts</span>
                <span><FaStarOfLife className={styles.icon}/>Get certificate</span>
                <span><FaStarOfLife className={styles.icon}/>Get membership</span>
            </div>
            .

        </div>
        <div className={styles.image}>
            <img src="/images/hero.png" alt="" />
        </div>

    </div>
  )
}

export default Hero