#include <mega128.h>
#include <delay.h>
#include <stdlib.h>

unsigned char btn[5] = {
    0,
},R = 0;
unsigned char led[5] = {0x01, 0x02, 0x04, 0x08, 0x10};

unsigned char lcount = 0, ledmode = 0, l_s = 0, b_s = 0;

unsigned int score = 0;

volatile unsigned int g_elapsed_time;
void initLED();
void initFND();
void setTCCR0();
void initTCNT0();
void setTIMSK();
void initUART();
void sleep(unsigned int elapsed_time);
void sleep2(unsigned int elapsed_time);
interrupt[TIM0_OVF] void timer0_ovf_isr(void);
// pinc가 fnd 이미 중복 사용중
unsigned char swit;
unsigned char Ran;
char score = 0x00;
char kam = 0x00;
char i = 0x00;
char A = 0x05;

void main(void)
{
    PORTE = 0x00;
    DDRD = 0xff;
    DDRA = 0xff;
    EIMSK = 0b00010000;
    EICRB = 0b00000010;
    SREG |= 0x80;
    TCCR2 = 0x6d; // 0110 1111,fast pwm,분주비1024
    OCR2 = 255;
    TCNT2 = 0;
    initUART();
    initLED();
    initFND();
    setTCCR0();
    initTCNT0();
    setTIMSK();
#asm("sei")

    while (0 < A)
    {
        PORTE = A;
        sleep(1000);
        --A;
    }
    PORTE = 0x00;

    sleep(1000);

    for (i = 0; i < 25; ++i)
    {
        Ran = (rand() % 5);
        Ran = ~(0x01 << Ran);
        PORTF = Ran;
        sleep2(1000);
    }

    while (1)
    {
        if (PINC == 0x01)
            btn[0] = 1, b_s = 1;
        else if (PINC == 0x02)
            btn[1] = 1, b_s = 1;
        else if (PINC == 0x04)
            btn[2] = 1, b_s = 1;
        else if (PINC == 0x08)
            btn[3] = 1, b_s = 1;
        else if (PINC == 0x10)
            btn[4] = 1, b_s = 1;
        else if (PINC == 0x00)
            btn[0] = btn[1] = btn[2] = btn[3] = btn[4] = 0, b_s = 0;

        if (l_s == 1)
        {
            if (btn[0] == led[R])
                score++, l_s = 0, b_s = 0; // 수정필요
            if (btn[1] == led[R])
                score++, l_s = 0, b_s = 0;
            if (btn[2] == led[R])
                score++, l_s = 0, b_s = 0;
            if (btn[3] == led[R])
                score++, l_s = 0, b_s = 0;
            if (btn[4] == led[R])
                score++, l_s = 0, b_s = 0;
        }

        PORTA = 0x10 | score % 10;
        delay_ms(2);
        PORTA = 0x20 | 0;
        delay_ms(2);
        PORTA = 0x40 | l_s;
        delay_ms(2);
    }
}
}

void initLED(void)
{
    DDRF = 0xff;
    PORTF = 0xff;
}

void initUART()
{
    UCSR0A = 0b00000010; // 2배모드
    UCSR0B = 0b00011000; // 수신 송신 En
    UCSR0C = 0b00000110; // 정지bit 1 데이터 비트 8bit
    UBRR0H = 0;
    UBRR0L = 103;
}

void initFND(void)
{
    DDRE = 0xff;
    PORTE = 0x00;
    DDRC = 0x00;
}

void setTCCR0(void)
{
    TCCR0 = (1 << CS02);
}

void initTCNT0(void)
{
    TCNT0 = 6;
}

void setTIMSK(void)
{
    TIMSK = 0b1000001; // TOIE0,OCIE0 pin
}

void sleep(unsigned int elapsed_time)
{
    g_elapsed_time = 0;
    unsigned char flag = 0x00;

    while (g_elapsed_time < elapsed_time)
    {
        if ((0xff != PINC) && (flag == 0x00))
        {
            flag = 0x01;
            swit = PINC;

            if (swit == Ran)
            {
                score += 0x05;
            }

            if (score == 0xA0)
            {
                score = 0x00;
                PORTE = score;

                while (10 > kam)
                {
                    PORTF = 0x00;
                    sleep2(100);
                    PORTF = 0xff;
                    sleep2(100);
                    kam++;
                }

                i = 0x00;
            }

            PORTE = score;
        }
    }
}

void sleep2(unsigned int elapsed_time)
{
    g_elapsed_time = 0;
    TCNT0 = 6;

    while (g_elapsed_time < elapsed_time)
    {
    }
}

interrupt[TIM0_OVF] void timer0_ovf_isr(void)
{
    ++g_elapsed_time;
}
interrupt[EXT_INT4] void int4(void)
{
    ledmode = 1;
}
interrupt[TIM2_COMP] void tim2_comp(void)
{
    if (ledmode == 1)
    {
        lcount++;

        if (lcount == 126)
        {
            R = rand() % 5;
            PORTD = led[R];
            l_s = 1;
            lcount = 0;
        }
    }
}
