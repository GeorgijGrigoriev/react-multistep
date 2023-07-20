import React, { useState, useEffect } from 'react'
import { styled, setup } from 'goober'
import { MultiStepPropsBase, NavButton, Step } from './interfaces'

setup(React.createElement)

const Ol = styled('ol')`
  display: flex;
  margin: 0;
  padding-bottom: 2.2rem;
  list-style-type: none;
  flex-direction: row;
`
const Li = styled('li')`
  display: inline-block;
  text-align: center;
  padding-top: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
  min-width: 6rem;
  border-bottom: 1px solid silver; 
`
const DoingSpan = styled('span')`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #33C3F0;
  @media (max-width: 360px) {
    position: absolute;
    top: 1rem;
    left: 2rem;
  }    
`
const Span = styled('span')`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: silver;
  @media (max-width: 360px) {
    display: none;
  }
`

const getStep = (defaultIndex: number, newIndex: number, length: number): number => {
  if (newIndex <= length) {
    return newIndex;
  }
  return defaultIndex;
}

const getTopNavStyles = (activeStep: number, length: number): string[] => {
  const styles: string[] = []
  for (let i = 0; i < length; i++) {
    if (i < activeStep) {
      styles.push('done')
    } else if (i === activeStep) {
      styles.push('doing')
    } else {
      styles.push('todo')
    }
  }
  return styles
}

const getButtonsState = (activeStep: number, length: number, stepIsValid: boolean) => {
  if (activeStep === 0) {
    console.log(`ActiveStep === 0, isValid: ${stepIsValid}`)
    return {
      prevDisabled: true,
      nextDisabled: !stepIsValid
    }
  } else if (activeStep > 0 && activeStep <= (length - 1)) {
    console.log(`ActiveStep > 0, isValid: ${stepIsValid}`)
    return {
      prevDisabled: false,
      nextDisabled: !stepIsValid
    }
  } else {
    console.log(`Error: activeStep: ${activeStep} < length: ${length} `)
  }
}

export default function MultiStep(props: MultiStepPropsBase) {
  let { children } = props
  if (!children) {
    throw TypeError("Error: No steps to show")
  }

  const [stepIsValid, setStepIsValid] = useState(false)
  const stepStateChanged = (isValid: boolean) => {
    console.debug(`stepStateChanged invoked, isValid: ${isValid}`)
    setStepIsValid(() => isValid)
  }

  children = React.Children.map(children, child => React.cloneElement(child, { signalParent: stepStateChanged }))
  let steps = children.map(child => (
    {
      title: child.props.title,
      component: child
    })
  )
  const numberOfSteps = steps.length
  const stepCustomStyle = typeof props.stepCustomStyle === 'undefined' ? {} : props.stepCustomStyle
  const showNavButtons = typeof props.showNavigation === 'undefined' ? true : props.showNavigation
  const prevButton: NavButton = typeof props.prevButton === 'undefined' ? {} : props.prevButton
  const nextButton: NavButton = typeof props.nextButton === 'undefined' ? {} : props.nextButton
  
  //todo: remove and update docs
  // 1) stepsArray
  // 2) const directionType = typeof props.direction === 'undefined' ? 'row' : props.direction
  // 3) const showTitles = typeof props.showTitles === 'undefined' ? true : props.showTitles

  const [activeStep, setActiveStep] = useState(getStep(0, props.activeStep, numberOfSteps))
  const [stylesState, setStylesState] = useState(getTopNavStyles(activeStep, numberOfSteps))
  const [buttonsState, setButtonsState] = useState({
    prevDisabled: true,
    nextDisabled: true
  })

  useEffect(() => {
    setButtonsState(getButtonsState(activeStep, numberOfSteps, stepIsValid))
  }, [activeStep, stepIsValid])

  const setStepState = (activeStep: number) => {
    setStylesState(getTopNavStyles(activeStep, numberOfSteps))
    setActiveStep(activeStep < numberOfSteps ? activeStep : activeStep)
  }

  const next = () => {
    let newActiveStep = activeStep === steps.length - 1 ? activeStep : activeStep + 1
    setStepState(newActiveStep) 
    console.log(`Next, ActiveStep: ${newActiveStep}`)
  }
  const previous = () => {
    let newActiveStep = activeStep > 0 ? activeStep -1 : activeStep
    setStepState(newActiveStep)
    console.log(`Prev, ActiveStep: ${newActiveStep}`)
  }

  const handleOnClick = (evt: { currentTarget: { value: number } }) => {
    if (!stepIsValid) {
      console.log('Error: Step validation failed')
      return
    }

    if (
      evt.currentTarget.value === numberOfSteps - 1 &&
      activeStep === numberOfSteps - 1
    ) {
      setStepState(numberOfSteps)
    } else {
      setStepState(evt.currentTarget.value)
    }
  }

  const renderTopNav = () =>
    steps.map((s, i) => {
      return (
        <Li
          style={{ ...stepCustomStyle }}
          onClick={handleOnClick}
          key={i}
        >
          {stylesState[i] === 'doing' ?
            <DoingSpan>{s.title ?? i + 1}</DoingSpan> :
            <Span>{s.title ?? i + 1}</Span> }
        </Li>
      )
    })

  const renderButtonsNav = () =>
    showNavButtons && (
      <div>
        <button onClick={previous}
          style={prevButton?.style}
          disabled={buttonsState.prevDisabled}>
          {prevButton && prevButton.title ? <>{prevButton.title}</> : <>Prev</>}
        </button>
        <button onClick={next}
          style={nextButton?.style}
          disabled={buttonsState.nextDisabled}>
          {nextButton && nextButton.title ? <>{nextButton.title}</> : <>Next</>}
        </button>
      </div>
    )

  return (
    <>
      <Ol>{renderTopNav()}</Ol>
      {steps[activeStep].component}
      <div>{renderButtonsNav()}</div>
    </>
  )
}
