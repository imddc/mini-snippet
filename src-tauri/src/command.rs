use rdev::{simulate, EventType, Key, SimulateError};
use std::{thread, time};

pub fn send(event_type: &EventType) {
    let delay = time::Duration::from_millis(20);
    match simulate(event_type) {
        Ok(()) => (),
        Err(SimulateError) => {
            println!("We could not send {:?}", event_type);
        }
    }
    // Let ths OS catchup (at least MacOS)
    thread::sleep(delay);
}

pub fn switch_window() {
    send(&EventType::KeyPress(Key::MetaLeft));
    send(&EventType::KeyPress(Key::Tab));
    send(&EventType::KeyRelease(Key::Tab));
    send(&EventType::KeyRelease(Key::MetaLeft));
}

pub fn paste() {
    send(&EventType::KeyPress(Key::MetaLeft));
    send(&EventType::KeyPress(Key::KeyV));
    send(&EventType::KeyRelease(Key::KeyV));
    send(&EventType::KeyRelease(Key::MetaLeft));
}
