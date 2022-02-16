import React, { useState } from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import saayaLogo from '../Assets/Images/saaya logo.svg'
import phone from '../Assets/Images/phone.svg'
import video from '../Assets/Images/video.svg'
import whatsapp from '../Assets/Images/whatsapp.svg'
import english from '../Assets/Images/english.svg'
import 'react-lazy-load-image-component/src/effects/blur.css';
import ModalVideo from 'react-modal-video'
import Swal from 'sweetalert2'
import { Blogs, Languages, YTlinks, Images, Constants } from '../Helper'

export default function LandingPage() {
    const [isOpen, setOpen] = useState(false)
    const [value, setValue] = useState('English');
    const [country, setCountry] = useState(english);
    const [code, setCode] = useState('');
    const accessCode = 'aramco'
    const [data, setData] = useState(Blogs.english);
    const [show, setShow] = useState(false);
    const [linksLang, setLinksLang] = useState();
    const [embedId, setEmbedId] = useState();
    const [langChinese, setLangChinese] = useState(false);
    const [current_lang, setCurrentLang] = useState(Constants.english);

    const codeChecker = (e) => {
        if (code.length !== 0) {
            if (code.toLowerCase() === accessCode.toLowerCase()) {
                setShow(true)
            } else {
                alert('Invalid Access Code')
            }
        }
    }

    const handleChange = (item, event) => {
        setValue(item.name)
        setCountry(item.image)
        if (item.name === 'English') {
            setData(Blogs.english)
            setLinksLang()
            setLangChinese(false)
            setCurrentLang(Constants.english)
        } else if (item.name === 'اردو') {
            setData(Blogs.urdu)
            setLinksLang(YTlinks.urdu)
            setLangChinese(false)
            setCurrentLang(Constants.urdu)
        } else if (item.name === 'عربى') {
            setData(Blogs.arabic)
            setLinksLang()
            setLangChinese(false)
            setCurrentLang(Constants.arabic)
        } else if (item.name === 'বাংলা') {
            setData(Blogs.bangali)
            setLinksLang()
            setLangChinese(false)
            setCurrentLang(Constants.bangali)
        } else if (item.name === 'हिन्दी') {
            setData(Blogs.hindi)
            setLinksLang(YTlinks.hindi)
            setLangChinese(false)
            setCurrentLang(Constants.hindi)
        } else if (item.name === 'Tagalog') {
            setData(Blogs.tagalog)
            setLinksLang(YTlinks.tagalog)
            setLangChinese(false)
            setCurrentLang(Constants.tagalog)
        } else if (item.name === '中国人') {
            setData(Blogs.chinese)
            setLinksLang(YTlinks.chinese)
            setLangChinese(true)
            setCurrentLang(Constants.chinese)
        }
    };

    const imgAction = (img) => {
        window.open(img, '_blank');
    }

    window.onbeforeunload = function () {
        setCode('')
        setShow(false)
        document.cookie = "accessCode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    const handleVidOpen = (id) => {
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        const body = document.body;
        body.style.height = '100vh';
        body.style.overflowY = 'hidden';
        setOpen(true)
        setEmbedId(id)
    }

    const handleVidClose = () => {
        setOpen(false)
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        body.style.height = '';
        body.style.overflowY = '';
    }

    return (
        <div className='main hero-image'>
            <Container fluid className='container_main'>
                <Row className='hero notVisible'>
                    <div className={`bgDiv transitionSize ${!show && 'fullScreenTemp '}`}>
                    </div>
                    <div className='saayaLogo posAbs'>
                        <img className={`${show ? 'opacityVisibleWithTransition' : 'opacityZero'}`} src={saayaLogo} alt='img22' />
                    </div>
                    <Col xs={12} className='height570 displayFlex centerheight heading ml0'>
                        {show ?
                            <>
                                <p className='header'>{current_lang.heading}</p>
                                <p className='secondary'>{current_lang.subHeading}</p>
                            </>
                            :
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className='fontSize22'>Enter Access code</label>
                                <input
                                    autoComplete='new-password'
                                    autoFocus
                                    value={code}
                                    onKeyPress={e => e.key === 'Enter' && codeChecker(code)}
                                    onClick={() => window.scrollTo(0, 0)}
                                    onChange={(e) => setCode(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Code"
                                />
                                <button disabled={code.length === 0} className="btn btn-primary" onClick={() => codeChecker()}>Enter</button>
                            </div>
                        }
                    </Col>
                </Row>

            </Container>
            {show ?
                <Container className='buttonContainer'>
                    <Row className='buttonRow'>
                        <Col sm className='buttonColumn d-grid'>
                            <Button onClick={() => Swal.fire({
                                text: current_lang.contact_us,
                                confirmButtonText: current_lang.okay
                            })}>
                                <Image src={phone} />
                                {current_lang.hotline_btn}
                            </Button>
                            <a rel="noreferrer noopener" target="_blank" href='https://cwp.saayahealth.com'>
                                <Button>
                                    <Image src={video} />
                                    {current_lang.vid_call_btn}
                                </Button>
                            </a>
                            <a rel="noreferrer noopener" target="_blank" href='https://wa.me/message/KJB7UMMYXUFEO1'>
                                <Button>
                                    <Image src={whatsapp} />
                                    {current_lang.whatsApp_btn}
                                </Button>
                            </a>
                        </Col>
                    </Row>
                    <Row className='dropdownRow'>
                        <div className="dropdown">
                            {/* conditinal classname if value contains any value from array */}

                            <div className={`labelLanguage ${['عربى', 'اردو'].includes(value) ? 'alignRight' : ''}`}>{current_lang.choose_lang}</div>
                            <Dropdown>
                                <Dropdown.Toggle className='toggle' variant="success" id="dropdown-basic">
                                    {value === '' ? 'Select Language' : (
                                        <>
                                            <div className='toggleDiv'>
                                                <Image width={'30px'} src={country} /> {value}
                                            </div>
                                        </>
                                    )}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {Languages?.map((item, index) => (
                                        <Dropdown.Item onClick={(e) => handleChange(item, e)} key={'111' + index + item}>
                                            <Image width={'30px'} src={item.image} /> {item.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Row>
                    <Row className='cardRow d-grid'>
                        {linksLang?.map((item, index) => (
                            item.embedId ?
                                <Col key={item + index}>
                                    <div
                                        onClick={() => handleVidOpen(item.embedId)}
                                        className="card bg-dark text-white min100"
                                    >
                                        <img
                                            className='card-img pointerCursor'
                                            src={`https://img.youtube.com/vi/${item.embedId}/hqdefault.jpg`}
                                        />
                                        <div className="card-img-overlay">
                                            <h5 className="card-title">
                                                <img className='ytIconImg' src={Images.yt_icon} />{item.title}
                                            </h5>
                                        </div>
                                    </div>
                                </Col>
                                : <></>
                        )).reverse()}

                        {linksLang?.map((item, index) => (
                            item.link ?
                                <Col key={'222' + item + index + item.title}>
                                    <div
                                        // Inline Style Background Color with
                                        onClick={() => window.open(item.link, '_blank')}
                                        className="urlIcon card text-white min100 "
                                    >
                                        <img
                                            className='card-img pointerCursor '
                                            src={item.dImg}
                                        />
                                        <div className="card-img-overlay">
                                            <h5 className="card-title">
                                                {item.title}
                                            </h5>
                                        </div>
                                    </div>
                                </Col>
                                : <></>
                        )).reverse()}

                        {data?.map((item, index) => (
                            <Col key={'333' + item + index}>
                                <div className="card bg-dark text-white min100" onClick={() => imgAction(item.image_hd)}>
                                    <img className='card-img' src={item.image} alt={item.title} />
                                    <div className="card-img-overlay">
                                        <h5 className="card-title">{item.title}</h5>
                                    </div>
                                </div>
                            </Col>
                        )).reverse()}


                        <div className={`video-responsive ${!isOpen && 'hide'}`}>
                            <ModalVideo
                                channel='youtube'
                                autoplay={true}
                                isOpen={isOpen}
                                videoId={embedId}
                                onClose={() => handleVidClose()}
                            />
                        </div>
                    </Row>
                    {/* <Row className='moreBlogRow'>
                        <div className="col-12 text-center my-4">
                            <a href="https://saayahealth.com/index.php/saaya-blog" className="btn mb-md-5"><span className="text-light">More Blogs</span></a>
                        </div>
                    </Row> */}
                </Container>
                : (<></>)}
        </div>
    )
}