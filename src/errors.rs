use std::error::Error;
use std::fmt;

#[derive(Debug)]
pub struct ShaderError(pub String);

impl fmt::Display for ShaderError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Error: {}", self.0)
    }
}

impl Error for ShaderError {}
